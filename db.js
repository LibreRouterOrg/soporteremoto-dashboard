const pull = require('pull-stream')
const ssbKeys = require('ssb-keys')

//create a secret-stack instance and add ssb-db, for persistence.
var createSbot = require('secret-stack')({})
    .use(require('ssb-db'))
    .use(require('scuttlebot/plugins/master'))
    .use(require('ssb-backlinks'))
    .use(require('ssb-about'))
    .use(require('ssb-threads'))

// create the db instance.
// Only one instance may be created at a time due to os locks on port and database files.
var sbot = createSbot(require('ssb-config/inject')('soporteremoto',{
    port: 8091,
    caps: {
      shs: 'v/vqlQfe1EGN5gi187Wpl+0RIaeGaNkjGeoHtjmcouA=',
      invite: 'VSPZS69Yqzz2F6E+TaQBKjxJqJGXAfkRKwnCbSjvy70='
    }
}))

//setTimeout(()=>{
//
//},1000)

export default sbot