const fs = require('fs');
const ssbKeys = require('ssb-keys');
const crypto = require('crypto');
const { getSharedConfig, sendSharedConfig } = require('./shared-state');

export const saveConfig = (config={}) => {
    try {
        fs.writeFileSync('.config.json', JSON.stringify(config, null, '  '));
        return true;
    } catch (e) {
        return false;
    }
}

export const savePasswords = ({apiKey, password}) => {
    try {
        fs.writeFileSync('.passwords.json', JSON.stringify({apiKey, password}, null, '  '), { encoding: 'utf8'});
        return true;
    } catch (e) {
        return false;
    }
}

export const getPasswords = () => {
    try {
        const rawdata = fs.readFileSync('.passwords.json', { encoding: 'utf8' });
        return JSON.parse(rawdata);
    } catch (e) {
        return;
    }
}

export const getConfig = () => {
    if(process.env.REMOTE_CONTAINER) {
        return {
            "network": {
                rooms: [
                    process.env.ROOM_INVITE
                ],
                pubs: [],
                secretHash: process.env.SECRET_HASH,
                secretInvite: process.env.SECRET_INVITE,
                communityKeys: {
                    id: process.env.COMMUNITY_ID
                }
            }
        };
    }
    try {
        const rawdata = fs.readFileSync('.config.json');
        return JSON.parse(rawdata);
    } catch(e) {
        return false;
    }
};

export const isConfigured = () => {
    if (getConfig()) return true;
    return false;
}

export const generateConfig = () => {
    return {
        network : {
            rooms : [],
            pubs: [],
            secretHash: crypto.randomBytes(32).toString('base64'),
            secretInvite: crypto.randomBytes(32).toString('base64'),
            communityKeys: ssbKeys.generate()
        }
    }
}
let firstCall = true;
export const loadOrCreateConfig = async() => {
    let config = getConfig();
    
    if(!isConfigured()) {
        let servers = [];
        try {
            servers = await getSharedConfig();
        } catch(e) {
            console.log('Shared-state not found')
        }

        if(servers.length > 0) {
            config = servers[0].config;
            saveConfig(config);
        }
        else {
            config = generateConfig();
            saveConfig(config);
        }
    }
    
    if(firstCall) {
        sendSharedConfig(config);
        firstCall = false;
    }

    return config;
}   

export const getPublicCertificate = async() => {
    const config = await loadOrCreateConfig();
    if (!('certificates' in config)) {
        return undefined;
    }
    const certificates = config['certificates'];
    if (!('pubCert' in certificates)) {
        return undefined;
    }
    return certificates['pubCert'];
}
