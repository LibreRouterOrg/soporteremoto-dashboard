import ssbKeys from 'ssb-keys'
import  * as bip39  from 'bip39'
import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import { derivePath, } from 'ed25519-hd-key';

bip39.setDefaultWordlist('spanish')

const generate = (words) => {
    if(!words) { words = bip39.generateMnemonic() }
    let secret =bip39.mnemonicToSeedSync(words)
    secret = secret.toString('hex');
    secret = derivePath("m/44'/148'/0'", secret);
    secret = nacl.sign.keyPair.fromSeed(secret.key);
    const keyPair = {
        publicKey: '@' + naclUtil.encodeBase64(secret.publicKey)+ '.ed25519',
        privateKey: naclUtil.encodeBase64(secret.secretKey)+'.ed25519'
    }
    return {
        words,
        cuerve: 'ed25519',
        ...keyPair
    }
}

export const saveCredentials = (credentials) => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
}

const regenerate = (words) => {
    return new Promise((res, rej) => {
        try {
            const credentials = generate(words)
            res(credentials)
        } catch(e) {
            rej({error: 'wrong words'})
        }
    })
}

const isSaved = () => {
    let credentials
    if(process.env.REACT_APP_CONTAINER && process.env.REACT_APP_WORDS) {
        credentials = generate(process.env.REACT_APP_WORDS)
        return credentials
    }
    credentials = localStorage.getItem('credentials')
    if (!credentials) { return false }
    return JSON.parse(credentials);
}

const loadOrCreate = () => {
    let credentials = isSaved();
    if (!credentials) {
        credentials = generate();
        saveCredentials(credentials)

    }
    return credentials;
}


export default {
    ...ssbKeys, 
    generate,
    isSaved,
    regenerate,
    loadOrCreate,
    loadOrCreateSync: loadOrCreate
}
