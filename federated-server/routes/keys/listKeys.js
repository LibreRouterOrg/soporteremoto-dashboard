import { getSbotAsPromise } from "../../db"
import pull from 'pull-stream'
import { loadOrCreateConfig } from "../../config"
import * as signify from '../../utils/signify'

const checkSignature = (pubCert) => ({ signature, }) => {
    try {
        return signify.checkSignature(signature.key, signature.signature, pubCert)
    } catch(e) {
        return false
    }
}

const reduceKeys = (sbot, pubCert) => (msgs = []) => {
    return msgs
        .map(msg => msg.value.content)
        .filter(checkSignature(pubCert))
        .reduce((prev, act) => {
            switch(act.action) {
                case 'add':
                    return [...prev, act.signature]
                case 'delete':
                    return prev.filter((signature) => signature.key !== act.signature.key)
                default:
                    return prev;
            }
        },[])
}

export const listKeys = async (req, res) => {

    const sbot = await getSbotAsPromise()
    const config = await loadOrCreateConfig();
    const { pubCert } = config.certificates

    pull(
        sbot.messagesByType({type: 'ssh-key'}),
        pull.collect((err, msgs) => {
            err
                ? res.json({eror: 'ssh key not found', err})
                : res.json(reduceKeys(sbot, pubCert)(msgs))
        })
    )
}