import keyManager  from './keyManager';
import restApi from './restApi'
import socketApi from './socketApi'

window.keyManager = keyManager
export default {
    account: {
        isLogged: ()=>{
            let keys = keyManager.isSaved()
            if (!keys) return keys
            restApi.config({keys})
            console.log(keys)
            return keys
        },
        createAccount: ({name, node}) => {
            const keys = keyManager.loadOrCreate();
            restApi.config({keys})
            console.log(keys)
            restApi.accounts.create({name,node}).then(console.log)
            return Promise.resolve({ words: keys.words })
        },
        set: restApi.accounts.set,
        get: restApi.accounts.get,
        list: restApi.accounts.list,
        recover: (words) => {
            return keyManager.regenerate(words)
                .then((keys)=>{
                    restApi.config({keys})
                    return Promise.resolve(keys)
                })
                .then(async(keys)=>{
                    const account = await restApi.accounts.get(keys.publicKey)
                    return Promise.resolve({...keys, account })
                })
        }
    },
    reports: {
        create: restApi.reports.create, 
        get: restApi.reports.get,
        list: restApi.reports.list,
        getStatus: restApi.reports.getStatus,
        setStatus: restApi.reports.setStatus
    },
    comment: {
        create: restApi.comment.create
    },
    getDefaultNode: () => Promise.resolve(''),
    nodes: {
        list: () => Promise.resolve([])
    },
    status: () => {
        const { http, socket } ={ ...restApi.status(), ...socketApi.status() };
        return { http, socket, general: http && socket }
    },
    socket: socketApi,
}
