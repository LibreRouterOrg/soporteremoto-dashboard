import { runFirstRunWizardServer } from './sever-fbw';
import { runFullServer } from './server-full';
const { DEPLOYED } = process.env;

///////////////////////////////////////////////////////
//Setup server
///////////////////////////////////////////////////////

if(!DEPLOYED){
  runFirstRunWizardServer()
} else {
  runFullServer()
}

