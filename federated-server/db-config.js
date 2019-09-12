const Path = require('path')
const Config = require('ssb-config/inject')
const ssbKeys = require('ssb-keys')

const { APP_NAME, SHS, INVITE} = process.env

const config = Config(APP_NAME || 'soporteremoto', {
    caps: {
        shs: SHS || 'v/vqlQfe1EGN5gi187Wpl+0RIaeGaNkjGeoHtjmcouA=',
        sign: null,
        invite: INVITE || 'VSPZS69Yqzz2F6E+TaQBKjxJqJGXAfkRKwnCbSjvy70='
    },
    app_name: APP_NAME || 'soporteremoto',
    server: true,
    local: true
});

config.keys = ssbKeys.loadOrCreateSync(Path.join(config.path, 'secret'))
const pubkey = config.keys.id.slice(1).replace(`.${config.keys.curve}`, '')

const socketPath = Path.join(config.path, 'socket')
config.connections.incoming.unix = [{
    scope: 'device',
    transform: 'noauth'
}]

//ssb-rooms
config.connections.incoming.tunnel = [{scope: 'public', transform: 'shs'}]
config.connections.outgoing.tunnel = [{transform: 'shs'}]

config.remote = `unix:${socketPath}:~noauth:${pubkey}`

module.exports = config;