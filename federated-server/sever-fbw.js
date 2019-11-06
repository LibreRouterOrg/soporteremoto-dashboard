import { showForm, setConfig } from './routes/config';

export const runFirstRunWizardServer = (app) => {
    app.get('/*', showForm)
    app.post('/*', setConfig)
    ///////////////////////////////////////////////////////
    //Start first boot server
    ///////////////////////////////////////////////////////
    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
}