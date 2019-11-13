import  express  from 'express'

import { runFirstRunWizardServer } from './sever-fbw';
import { runFullServer } from './server-full';
const { DEPLOYED } = process.env;

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
//Setup server
///////////////////////////////////////////////////////

if(!DEPLOYED){
  runFirstRunWizardServer(app)
} else {
  runFullServer(app)
}

