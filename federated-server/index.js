import { runFirstRunWizardServer } from './sever-fbw';
import { runFullServer } from './server-full';
import { getConfig } from './config';

///////////////////////////////////////////////////////
//Setup server
///////////////////////////////////////////////////////

if(!getConfig()){
  runFirstRunWizardServer()
} else {
  runFullServer()
}

