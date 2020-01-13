import { loadOrCreateConfig } from "../../config"
import { getSbotAsPromise } from "../../db"
import { signKey, readSecretBox } from "../../utils/signify"

export const signAndSaveKey = async ({ password, sshKey, name, action='add' },{network, certificates}, sbot) => { 
    
    // TODO: The signed key should include a timestamp so that the 
    // "add message" cannot be republished later using the previous signature.

    const genericId = network.communityKeys.id
    const encryptedSecCert = certificates.secCert

    // Decrypt the certificate to sign the keys
    const secCert = readSecretBox(genericId, encryptedSecCert, password )

    // Sing the key
    const signature = signKey(secCert, sshKey)

    // Save that signature and key in the ssb backend
    return new Promise((res, rej) => 
        sbot.publish({type: 'ssh-key', signature, name, action }, (err, msg, hash) =>{
            if(err) return rej({error: 'error saving ssh key', e: err})
            return res({success: 'ssh key saveed', action, signature }, msg, hash)
        })
    )
}

export const addKey = async (req, res) => {
    const sbot = await getSbotAsPromise()
    const config = await loadOrCreateConfig()
        
    // Validate request body
    const { password, sshKey, name } = req.body
    if (!password || !sshKey || !name ) return res.json({error: 'password, name or sshKey missing'})

    try {
        const response = await signAndSaveKey({ password, sshKey, name }, config, sbot)
        res.json(response)
    }    
    catch(e) {
        setTimeout(()=>res.json({error: 'wrong password', e}),3000)
    }

}
