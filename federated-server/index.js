import  express  from 'express'

import { createAccount, getAccount, setAccount, getSequence, listAccounts } from './routes/account';
import { createReport, getReport, listReports } from './routes/report';
import { createComment, getComment,  } from './routes/comment';

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

app.post('/comment/create', createComment)
app.post('/comment/get', getComment)

///////////////////////////////////////////////////////
//Start server
///////////////////////////////////////////////////////
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
