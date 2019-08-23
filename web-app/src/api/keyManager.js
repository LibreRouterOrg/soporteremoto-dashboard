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

const regenerate = (words) => {
    return generate(words)
}

const isSaved = () => {
    let credentials = localStorage.getItem('credentials')
    if (!credentials) { return false }
    return JSON.parse(credentials);
}

const loadOrCreate = () => {
    let credentials = isSaved();
    if (!credentials) {
        credentials = generate();
        localStorage.setItem('credentials', JSON.stringify(credentials))
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
