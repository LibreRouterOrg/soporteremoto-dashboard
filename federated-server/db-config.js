const Path = require('path')
const Config = require('ssb-config/inject')
const ssbKeys = require('ssb-keys')
const { loadOrCreateConfig } = require('./config')

export async function getSsbConfig(){
    const {network} = await loadOrCreateConfig()
    const config = Config('soporteremoto', {
        caps: {
            shs: network.secretHash,
            sign: null,
            invite: network.secretInvite
        },
        app_name: 'soporteremoto',
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
    return config;    
}