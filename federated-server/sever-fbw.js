import { showForm, setConfig, getPendrives } from './routes/config';
import { getServers } from './routes/network/getServers';

export const runFirstRunWizardServer = (app) => {
    app.get('/servers', getServers)
    app.get('/pendrives', getPendrives)
    app.get('/*', showForm)
    app.post('/*', setConfig)
    ///////////////////////////////////////////////////////
    //Start first boot server
    ///////////////////////////////////////////////////////
    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
}
