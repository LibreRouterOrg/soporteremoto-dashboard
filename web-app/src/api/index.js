import keyManager, { saveCredentials }  from './keyManager';
import restApi from './restApi'
import socketApi from './socketApi'

const LOG = false;
const log = (toLog) => LOG? console.log(toLog): null;

window.keyManager = keyManager
export default {
    account: {
        isLogged: ()=>{
            let keys = keyManager.isSaved()
            if (!keys) return keys
            restApi.config({keys})
            log(keys)
            return keys
        },
        createAccount: ({name, node, avatar}) => {
            const keys = keyManager.loadOrCreate();
            restApi.config({keys})
            log(keys)
            restApi.accounts.create({name,node, avatar}).then(log)
            return Promise.resolve({ words: keys.words })
        },
        set: restApi.accounts.set,
        get: restApi.accounts.get,
        list: restApi.accounts.list,
        recover: (words, forceCredentials) => {
            return keyManager.regenerate(words)
                .then((keys)=>{
                    restApi.config({keys})
                    return Promise.resolve(keys)
                })
                .then(async(keys)=>{
                    const account = await restApi.accounts.get(keys.publicKey)
                    if(!account.username || forceCredentials ) {
                        return Promise.resolve({...keys, account, verified: false})
                    }
                    saveCredentials(keys)
                    return Promise.resolve({...keys, account, verified: true })
                })
        }
    },
    reports: {
        create: restApi.reports.create, 
        get: restApi.reports.get,
        list: restApi.reports.list,
        getStatus: restApi.reports.getStatus,
        setStatus: restApi.reports.setStatus,
        getComments: restApi.reports.getComments,
    },
    comment: {
        create: restApi.comment.create
    },
    getDefaultNode: () => Promise.resolve(''),
    nodes: {
        list: () => Promise.resolve([]),
        getDefaultNode: restApi.nodes.getDefaultNode
    },
    status: () => {
        const { http, socket } ={ ...restApi.status(), ...socketApi.status() };
        return { http, socket, general: http && socket }
    },
    socket: socketApi,
}
