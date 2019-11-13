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

export const getConfig = () => {
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
        const servers = await getSharedConfig();
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

