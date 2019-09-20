import  express  from 'express'
import SocketIO from 'socket.io'

import { createAccount, getAccount, setAccount, getSequence, listAccounts } from './routes/account';
import { createReport, getReport, listReports } from './routes/report';
import { createComment, getComment,  } from './routes/comment';
import sbot from './db'
import pull from 'pull-stream'

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
pull(
  sbot.createLogStream({ live: true, reverse: false }),
  pull.flatten(),
  pull.drain(function (msg) {
    try {
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
    catch(e) {
      console.error('Error sending message via socket', e)
    }
  })
);