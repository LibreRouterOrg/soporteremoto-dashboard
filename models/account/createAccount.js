import  * as bip39  from 'bip39'
import  tweetnacl from 'tweetnacl'
import { derivePath } from 'ed25519-hd-key';


bip39.setDefaultWordlist('spanish')

export const createAccount= (db, state, {username = ''}) => new Promise((res, rej) => {
    if (!username || username.length < 3) rej('invalid username')
    
    const words = bip39.generateMnemonic()
    
    let secret =bip39.mnemonicToSeedSync(words)
    secret = secret.toString('hex');
    secret = derivePath("m/44'/148'/0'", secret);
    secret = tweetnacl.sign.keyPair.fromSeed(secret.key);
    const key = new Buffer(secret.secretKey);
    console.log(key)

    res({words})
})
