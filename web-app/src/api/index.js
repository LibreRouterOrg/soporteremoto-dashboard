import keyManager from './keyManager';
import restApi from './restApi'

window.keyManager = keyManager
export default {
    account: {
        isLogged: () => {
            let keys = keyManager.isSaved()
            if (!keys) return keys
            restApi.config({ keys })
            console.log(keys)
            return keys
        },
        createAccount: ({ name, node }) => {
            const keys = keyManager.loadOrCreate();
            restApi.config({ keys })
            console.log(keys)
            restApi.accounts.create({ name, node }).then(console.log)
            return { words: keys.words }
        },
        recoverAccount: (words) => {
            const keys = keyManager.regenerate(words);
            restApi.config({ keys })
            return new Promise((resolve, reject) => {
                restApi.accounts.get(keys['publicKey'])
                    .then(result => {
                        if ('name' in result) {
                            keyManager.set(keys);
                            resolve(keys);
                        } else {
                            reject('Frase secreta no valida');
                        }
                    })
                    .catch(reason => reject(reason));
            });
        },
        get: restApi.accounts.get,
        list: restApi.accounts.list,
        recover: (words) => {
            return keyManager.regenerate(words)
                .then((keys)=>{
                    restApi.config({keys})
                    return Promise.resolve(keys)
                })
        }
    },
    reports: {
        create: restApi.reports.create, 
        get: restApi.reports.get,
        list: restApi.reports.list
    },
    comment: {
        create: restApi.comment.create
    }
}
