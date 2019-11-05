import  express  from 'express'
import SocketIO from 'socket.io'

import { createAccount, getAccount, setAccount, getSequence, listAccounts } from './routes/account';
import { createReport, getReport, listReports, getStatusReport, setStatusReport } from './routes/report';
import { createComment, getComment,  } from './routes/comment';
import { getNodes } from './routes/network';
import { uploadBlob, getBlob } from './routes/blobs';

import { getSbot } from './db'
import pull from 'pull-stream'

import schedule  from 'node-schedule';
import { getActualNodes } from './shared-state';
import { sendNodesToDb } from './shcedule/nodes';

///////////////////////////////////////////////////////
//Setup http server
///////////////////////////////////////////////////////
const app = express()
app.use(express.json())

///////////////////////////////////////////////////////
//Enable cors
///////////////////////////////////////////////////////
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

///////////////////////////////////////////////////////
//Setup routes
///////////////////////////////////////////////////////
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

app.post('/comment/create', createComment)
app.post('/comment/get', getComment)

app.post('/network/nodes', getNodes)

app.post('/blobs/upload', uploadBlob)
app.get('/blobs/get/:hash', getBlob)

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
io.on('connection', function (socket) {
  console.log('New user connected')
});

///////////////////////////////////////////////////////
//Send update messages to clients
///////////////////////////////////////////////////////
getSbot(sbot => {
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
});


///////////////////////////////////////////////////////
// Start scheduled jobs
///////////////////////////////////////////////////////

schedule.scheduleJob("*/15 * * * *", ()=>{
  console.log("Check list of nodes in the mesh")
  getActualNodes().then(nodes => sendNodesToDb(nodes, sbot));
})

