import ssbKey from 'ssb-keys';
import { formatReport, formatUser } from './translator';

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

const api = {
    utils: {
        injectUserData: async(report) => {
            report = await report;
            const user = await api.accounts.get(report.user)
            console.log(report, user)
            return {
                ...report,
                user
            }
        }
    },
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
        set: (key, data={}) => {
            return sendToLog({
                type: 'about',
                about: config.keys.publicKey,
                ...data
            },{...config, path: `/account/set`})
        },
        get: (id) => {
            return fetchLog({id}, {...config, path: '/account/get'})
                .then(user => Promise.resolve(formatUser({...user, key: id})))
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
            title,
        }) => {
            return sendToLog({
                type: 'report',
                author: config.keys.publicKey,
                status,
                node,
                common_issue,
                body,
                title,
            }, {...config, path: '/reports/create'})
        },
        list: ({gt,lt} = {}) => 
            fetchLog({gt, lt}, {...config, path: '/reports/list'})
            .then(reports => 
                Promise.all(
                    reports
                    .map(formatReport)
                    .map(api.utils.injectUserData)
                )
            )
        ,
        get: (id) => 
            fetchLog({id}, {...config, path: '/reports/get'})
                .then(reports => Promise.all(reports.map(formatReport)))
                .then(reports => Promise.resolve(reports.length > 0? reports[0]: {}))
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

export default api;
