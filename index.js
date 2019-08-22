import  express  from 'express'

import { createAccount, getAccount } from './routes/account';
import { createReport, getReport } from './routes/report';
import { createComment, getComment } from './routes/comment';

///////////////////////////////////////////////////////
//Setup http server
///////////////////////////////////////////////////////
const app = express()
app.use(express.json())


///////////////////////////////////////////////////////
//Setup routes
///////////////////////////////////////////////////////
app.post('/account/create', createAccount)
app.post('/account/get', getAccount)

app.post('/reports/create', createReport)
app.post('/reports/get', getReport)

app.post('/comment/create', createComment)
app.post('/comment/get', getComment)


///////////////////////////////////////////////////////
//Start server
///////////////////////////////////////////////////////
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
