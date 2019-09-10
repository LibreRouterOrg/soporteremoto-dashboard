
const SecretStack = require('secret-stack')
const config = require('./db-config')
const utils = require('ssb-room/utils')

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

// create the db instance.
// Only one instance may be created at a time due to os locks on port and database files.
var sbot = CreateSBot(config)

// Start peer connections
setTimeout(()=>{
  sbot.conn.start()  
  let address = utils.inviteToAddress("net:mattermost.altermundi.net:8008~shs:BaP9ZncN6DjY9lmgqaZCTlSbGZKRTCbdAPgaDW7/o0M=:SSB+Room+PSK3TLYC2T86EHQCUHBUHASCASE18JBV24=")
  sbot.conn.connect(address, {type: 'room'}, console.log)
}, 1000)  

export default sbot