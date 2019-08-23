import keyManager  from './keyManager';
import restApi from './restApi'

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
            return { words: keys.words }
        },
        get: restApi.accounts.get,
        list: restApi.accounts.list
    },
    // reports: {
    //     create: restApi.reports.create, 
    //     list: restApi.reports.list
    // },

}
