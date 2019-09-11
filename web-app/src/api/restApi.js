import ssbKey from 'ssb-keys';
import { get } from 'http';

const sendToLog = async(content, config) => {
    const sequenceData  = await fetch(config.url+'/account/getSequence', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id: config.keys.publicKey})
    }).then((res) => res.json())

    let keys = { 
        curve: 'ed25519',
        public: config.keys.publicKey.substring(1).split('.')[0],
        private: config.keys.privateKey.split('.')[0],
        id: config.keys.public
    }

    const doc= ssbKey.signObj(keys, null, {
        previous: sequenceData.previous,
        sequence: sequenceData.sequence,
        author: config.keys.publicKey,
        timestamp: Date.now(),
        hash: 'sha256',
        content
    })
    console.log(doc)
    
    return fetch(config.url+config.path, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    })
    .then((res) => res.json())
}

const fetchLog = async(content={}, config) => {
    return fetch(config.url+config.path, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    }).then((res) => res.json())
}

let  config =  {
    url: 'http://localhost:8080',
}

export default {
    config: (newConfig) => { config = Object.assign(config, newConfig) },
    accounts: {
        create: ({name, node}) => {
            return sendToLog({
                type: 'about',
                about: config.keys.publicKey,
                name,
                node
            },{...config, path: `/account/create`})
        },
        get: (id) => {
            return fetchLog({id}, {...config, path: '/account/get'})
        },
        list: (data) => {
            return fetchLog({}, {...config, path: '/account/list'})
        }
    },
    reports: {
        create : ({
            status,
            node,
            common_issue,
            body,
        }) => {
            return sendToLog({
                type: 'report',
                author: config.keys.publicKey,
                status,
                node,
                common_issue,
                body
            }, {...config, path: '/reports/create'})
        },
        list: (data) => {
            const {gt,lt} = data || {};
            return fetchLog({gt, lt}, {...config, path: '/reports/list'})
        },
        get: (id) => {
            return fetchLog({id}, {...config, path: '/reports/get'})
        }
    },
    comment: {
        create:  ({
            parent,
            text
        }) => {
            return sendToLog({
                type: 'report',
                author: config.keys.publicKey,
                root: parent,
                body: text
            }, {...config, path: '/reports/create'})
        },
    }
}