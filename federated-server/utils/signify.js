const nacl = require('tweetnacl')
const { decodeBase64, encodeBase64, decodeUTF8} = require('tweetnacl-util')

const KEYNUMLEN = 8
const SECRETBYTES = 64
const PUBLICBYTES = 32
const SIGBYTES = 64

const PKGALG = [ 69, 100 ] //'Ed'
const KDFLAG = [ 66, 75 ] //'BK'

export const readSecret = (pKey) => {
    let pKeyBase64 = Array.from(decodeBase64(pKey))
    const secret = {
        pkgalg: pKeyBase64.splice(0, 2),
        kdfalg: pKeyBase64.splice(0, 2),
        salt: pKeyBase64.splice(0, 8),
        kdfrounds: pKeyBase64.splice(0, 8),
        checksum: pKeyBase64.splice(0, 12),
        keynum: pKeyBase64.splice(0, KEYNUMLEN),
        seckey: pKeyBase64.splice(0, SECRETBYTES),
    }
    return secret
}

export const readPublic = (pubKey) => {
    let pKeyBase64 = Array.from(decodeBase64(pubKey))
    return {
        pkgalg: pKeyBase64.splice(0,2),
        kdfalg: pKeyBase64.splice(0,2),
        kdfrounds: pKeyBase64.splice(0, 6),
        publkey: pKeyBase64.splice(0,PUBLICBYTES),
    }
}

export const writePublic = (pubKey, asString) => {
    if (typeof pubKey === 'string') { pubKey = decodeBase64(pubKey)}
    let pKeyBase64 = Array.from(pubKey)
    pKeyBase64 = [
        ...PKGALG,
        ...KDFLAG,
        ...[0,0,0,0,0,0],
        ...pKeyBase64
    ]

    if(!asString) { return pKeyBase64 }
    return encodeBase64(pKeyBase64)
}

export const readSignature = (signature) => {
    signature = Array.from(decodeBase64(signature))
    return {
        pkgalg: signature.splice(0,2),
        keynum: signature.splice(0,KEYNUMLEN),
        sig: signature.splice(0,SIGBYTES),
    }
}

export const checkSignature = (msg='', signature='', pKey='') => {
    msg = Uint8Array.from(decodeUTF8(msg))
    signature = Uint8Array.from(readSignature(signature).sig)
    pKey = Uint8Array.from(readPublic(pKey).publkey)
    return nacl.sign.detached.verify(msg, signature, pKey)
}

const uintSized = (base=[], size=32) => {
    let result = []
    for (let index = 0; index < size; index++) {
        result[index] = base[index] || 0
    }
    return Uint8Array.from(result)
}

export const writeSecretBox = (genericId='', password='', data) => {
    password = decodeUTF8(password)
    const nonce = uintSized(password, 24)
    const seed = uintSized(decodeBase64(genericId.replace('@','').split('.')[0]),32)
    const { secretKey, publicKey } = nacl.box.keyPair.fromSecretKey(seed)
    const toHide = data? decodeUTF8(data) : nacl.sign.keyPair().secretKey
    
    return {
        root: genericId,
        secret: encodeBase64(nacl.box(toHide, nonce, publicKey, secretKey)),
        unsecret: encodeBase64(toHide)
    }
}

export const formPrivate = (privateKey) => {
    const { secretKey, publicKey } = nacl.sign.keyPair.fromSecretKey(decodeBase64(privateKey))
    return {
        secretKey: encodeBase64(secretKey),
        publicKey: encodeBase64(publicKey),
    }
}
 
export const readSecretBox = (genericId, secret, password) => {
    const seed = uintSized(decodeBase64(genericId.replace('@','').split('.')[0]),32)
    const { secretKey, publicKey } = nacl.box.keyPair.fromSecretKey(seed)
    password = decodeUTF8(password)
    let nonce = uintSized(password, 24)
    const data = nacl.box.open(decodeBase64(secret), nonce, publicKey, secretKey)
    return encodeBase64(data)
}

export const signKey = (secretKey, keyToSign='') => {
    const signature = nacl.sign(decodeUTF8(keyToSign), secretKey)
    return {
        key: keyToSign,
        signature: encodeBase64(signature)
    }
}
