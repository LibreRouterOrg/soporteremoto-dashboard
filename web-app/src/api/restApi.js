import ssbKey from 'ssb-keys';
import { formatReport, formatUser, formatStatus, formatReportComments } from './translator';
import { localFetch } from './localFetch';

let STATUS = true

const whitTimeout = (time=2500, promise) => new Promise((res, rej) =>{
    setTimeout(()=>res(null), 2500)
    promise.then(res).catch(rej)
})

const uploadBase64 = async(base64) => {
    const {id} = await fetch(config.url+'/blobs/upload', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({base64})
    })
    .then((res) => res.json())
    return id;
}

const sendToLog = async(content, config) => {
    const sequenceData  = await fetch(config.url+'/account/getSequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: config.keys.publicKey })
    }).then((res) => res.json())

    let keys = {
        curve: 'ed25519',
        public: config.keys.publicKey.substring(1).split('.')[0],
        private: config.keys.privateKey.split('.')[0],
        id: config.keys.public
    }

    const doc = ssbKey.signObj(keys, null, {
        previous: sequenceData.previous,
        sequence: sequenceData.sequence,
        author: config.keys.publicKey,
        timestamp: Date.now(),
        hash: 'sha256',
        content
    })

    return localFetch(false)(config.url + config.path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    })
        .then(changeApiStatus)
}

const fetchBlob =  localFetch(true, true);

const fetchLog = async(content={}, config) => {
    return localFetch(true)(config.url+config.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    })
        .then(changeApiStatus)
}

let config = {
    url: 'http://localhost:8080',
}

const api = {
    utils: {
        injectUserData: async (report) => {
            report = await report;
            const user = await api.accounts.get(report.user)
            return {
                ...report,
                user
            }
        }
    },
    config: (newConfig) => { config = Object.assign(config, newConfig) },
    accounts: {
        create: async({name, node, avatar}) => {
            if (avatar) {
                avatar = await uploadBase64(avatar)
            }
            return await sendToLog({
                type: 'about',
                about: config.keys.publicKey,
                name,
                node,
                avatar,
            },{...config, path: `/account/create`})
        },
        set: async(key, data={}) => {
            if (data.avatar) {
                data.avatar = await uploadBase64(data.avatar)
            }
            return await sendToLog({
                type: 'about',
                about: config.keys.publicKey,
                ...data
            }, { ...config, path: `/account/set` })
        },
        get: (id) => {
            return fetchLog({id}, {...config, path: '/account/get'})
                .then(async(user) => {
                    let userFormated = formatUser({...user, key: id});
                    if(!userFormated.avatar) { return userFormated; }
                    let { res }= await fetchBlob(config.url+'/blobs/get/'+encodeURIComponent(userFormated.avatar))
                    userFormated.avatar = res;
                    return userFormated
                })
        },
        list: (data) => {
            return fetchLog({}, { ...config, path: '/account/list' })
        }
    },
    reports: {
        create: ({
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
            }, { ...config, path: '/reports/create' })
        },
        list: ({ gt, lt } = {}) =>
            fetchLog({ gt, lt }, { ...config, path: '/reports/list' })
                .then(reports =>
                    Promise.all(
                        reports
                            .map(formatReport)
                            .map(api.utils.injectUserData)
                    )
                )
        ,
        get: (id) =>
            fetchLog({ id }, { ...config, path: '/reports/get' })
                .then((reports) => Promise.resolve(formatReport(reports[0].messages[0]))),
        getStatus: (id) =>
            fetchLog({ id }, { ...config, path: '/reports/getStatus' })
                .then(statuses => Promise.resolve(statuses.map(formatStatus))),
        getComments: (id) =>
            fetchLog({id}, {...config, path: '/reports/get'})
                .then(reports => Promise.all(reports.map(formatReportComments)))
                .then(reports => Promise.resolve(reports.length > 0? reports[0]: {})),
        setStatus: (id, status) =>
            sendToLog({
                type: 'about',
                about: id,
                status
            }, { ...config, path: `/reports/setStatus` })
    },
    comment: {
        create: ({
            parent,
            text
        }) => {
            return sendToLog({
                type: 'report',
                author: config.keys.publicKey,
                root: parent,
                body: text
            }, { ...config, path: '/reports/create' })
        },
    },
    nodes: {
        getDefaultNode: () => whitTimeout(2500, fetch('http://thisnode.info/cgi-bin/hostname')
            .then(res => res.text())
            .catch(e => Promise.resolve(null))
        )
    },
    status: () => ({ http: STATUS })
}

function changeApiStatus({ error, res }) {
    if (error) {
        STATUS = false
    } else {
        STATUS = true
    }
    return Promise.resolve(res)
}

export default api;
