import SocketIO from 'socket.io'
import express from 'express'
import { createAccount, getAccount, setAccount, getSequence, listAccounts } from './routes/account';
import { createReport, getReport, listReports, getStatusReport, setStatusReport } from './routes/report';
import { createComment, getComment,  } from './routes/comment';
import { getNodes } from './routes/network';
import { uploadBlob, getBlob } from './routes/blobs';
import { addKey, listKeys, deleteKey } from './routes/keys';

import { getSbot } from './db'
import pull from 'pull-stream'

import schedule  from 'node-schedule';
import { getActualNodes } from './shared-state';
import { sendNodesToDb } from './schedule/nodes';
import path from 'path';
import app from './app';
import fs from 'fs';
import { resendToSupport } from './schedule/resendToSupport';
import sendPendingRequestsToTier from './schedule/sendSupportRequests';
import { createSupportRequest, setSupportRequest, listSupportRequests } from './routes/supportRequests';

export const runFullServer = () => {
    ///////////////////////////////////////////////////////
    //Start ssb
    ///////////////////////////////////////////////////////
    getSbot(sbot => {
        app.post('/account/create', createAccount)
        app.post('/account/get', getAccount)
        app.post('/account/set', setAccount)
        app.post('/account/list', listAccounts)
        app.post('/account/getSequence', getSequence)

        app.post('/reports/create', createReport)
        app.post('/reports/list', listReports)
        app.post('/reports/get', getReport)
        app.post('/reports/getStatus', getStatusReport)
        app.post('/reports/setStatus', setStatusReport)
        app.post('/reports/support-requests', listSupportRequests)
        
        app.post('/support-requests/create', createSupportRequest)
        app.post('/support-requests/set', setSupportRequest)

        app.post('/comment/create', createComment)
        app.post('/comment/get', getComment)

        app.post('/network/nodes', getNodes)

        app.post('/blobs/upload', uploadBlob)
        app.get('/blobs/get/:hash', getBlob)

        app.post('/keys/add', addKey)
        app.post('/keys/delete', deleteKey)
        app.post('/keys/list', listKeys)

        app.use(express.static(path.join(__dirname,'..','web-app','build')));
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname,'..','web-app','build','index.html'));
        });

        ///////////////////////////////////////////////////////
        //Start server
        ///////////////////////////////////////////////////////
        const server = app.listen(8080, function () {
            console.log('Example app listening on port 8080!');
        });

        ///////////////////////////////////////////////////////
        //Start socketIo server
        ///////////////////////////////////////////////////////
        const io = SocketIO(server);
        io.on('connection', function() {
            console.log('New user connected')
        });

        ///////////////////////////////////////////////////////
        //Send update messages to clients
        ///////////////////////////////////////////////////////
        pull(
            sbot.createLogStream({ live: true, reverse: false }),
            pull.flatten(),
            pull.drain(function (msg) {
            if (msg && msg.content && msg.content.type ) {
                switch (msg.content.type) {
                case 'about':
                    io.emit('about', msg)
                    return;
                case 'report':
                    if (msg.content.previous !== null) {
                    io.emit('comment', msg)
                    } else {
                    io.emit('report', msg)
                    return
                    }
                }
            }
            })
        );

        ///////////////////////////////////////////////////////
        // Start scheduled jobs
        ///////////////////////////////////////////////////////
        schedule.scheduleJob("*/15 * * * *", ()=>{
            console.log("Check list of nodes in the mesh")
            getActualNodes().then(nodes => sendNodesToDb(nodes, sbot));
        })

        schedule.scheduleJob('*/1 * * * *', () => {
            if (!fs.existsSync('./toSend.json')) return;
            resendToSupport();
        })

        schedule.scheduleJob('*/15 * * * *', () => {
            sendPendingSupportRequestsToTier();
        })
    });
}
