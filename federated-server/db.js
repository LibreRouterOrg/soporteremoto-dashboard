const SecretStack = require('secret-stack')
const { getSsbConfig } = require('./db-config')
const utils = require('ssb-room/utils')
const pull = require('pull-stream')

//create a secret-stack instance and add ssb-db, for persistence.
var CreateSBot = SecretStack()
  .use(require('ssb-db'))
  .use(require('ssb-lan'))
  .use(require('ssb-conn'))
  .use(require('ssb-master'))
  .use(require('ssb-replicate'))
  .use(require('ssb-room/tunnel/client'))
  .use(require('ssb-friends'))
  .use(require('ssb-backlinks'))
  .use(require('ssb-about'))
  .use(require('ssb-threads'))
  .use(require('ssb-promiscuous'))
  .use(require('ssb-blobs'))

// create the db instance.
// Only one instance may be created at a time due to os locks on port and database files.
var sbot;
getSsbConfig().then(config => {
  sbot = CreateSBot(config)
  startPeerConnections();
})

// Start peer connections
function startPeerConnections() {
  setTimeout(()=>{
    sbot.conn.start()  
    if( process.env.ROOM_INVITE) {
      console.log('Using room invite', process.env.ROOM_INVITE)
      let address = utils.inviteToAddress(process.env.ROOM_INVITE)
      sbot.conn.connect(address, {type: 'room'}, (err)=>console.log(err? 'ERROR: '+err: 'Conexión con ssb-room correcta'))
    }
  
    pull(
      sbot.createLogStream({live: true, old: false}),
      pull.drain(console.log)
    )
  }, 1000)
}

export function getSbot(cb) {
  if(!sbot) {
    setTimeout(()=>getSbot(cb), 1000)
    return;
  }
  return cb(sbot)
}

export default sbot