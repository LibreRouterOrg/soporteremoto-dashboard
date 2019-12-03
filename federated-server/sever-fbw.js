import { setConfig, getPendrives, copyCertificate} from './routes/config';
import { getServers } from './routes/network/getServers';
import express from 'express'
import app from './app';

export const setupFirstRunWizardApp = (app) => {
    app.get('/servers', getServers)
    app.get('/pendrives', getPendrives)
    app.post('/copy-certificate', copyCertificate)
    app.post('/set-config', setConfig)
    app.use(express.static('routes/config/statics'))
}

export const runFirstRunWizardServer = () => {
    setupFirstRunWizardApp(app)
    ///////////////////////////////////////////////////////
    //Start first boot server
    ///////////////////////////////////////////////////////
    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
}
