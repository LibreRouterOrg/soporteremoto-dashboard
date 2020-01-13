import { getSbotAsPromise } from "../../db"
import { orderLog } from "../../utils/orderLog"
import { getStatus } from "./enrich"
import ip from 'ip'
import { getPasswords, loadOrCreateConfig } from "../../config"
import fetch from 'node-fetch'
import { signAndSaveKey } from "../keys/addKey"

const sendRequestToTier = async (supportRequest) => {
    const { apiKey, password } = getPasswords()
    const ln6Ip = ip.address('librenet6', "ipv6")
    const sbot = await getSbotAsPromise()
    const {network, certificates } = await loadOrCreateConfig()

    const toSend = {
        request: {
            librenet6: {
                ip: ln6Ip,
                public: ip.isPublic(ln6Ip)
            },
            issue: supportRequest
        },
        apiKey
    }

    let {error, sshKey, name} = await fetch(process.env.SUPPORT_ENDPOINT+'/support-request', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toSend)
    }).then(res => res.json())

    console.log({error, sshKey, name})
    if (error) throw Error(error);

    const added = await signAndSaveKey({ password, sshKey, name, action: 'add'}, { network, certificates }, sbot)
    console.log('\n\n\n\n\n\n\n',added)
    return;
}

export const createSupportRequest = async (req, res) => {
    /*
    content.type: 'supportRequest'
    */
    const sbot = await getSbotAsPromise()
    try {
        const supportRequestData = orderLog(req.body);
        if (supportRequestData)
            sbot.add(supportRequestData,
                async (error, supportRequest) => {
                    if (error) return res.json({ error })
                    try {
                        await sendRequestToTier(supportRequest)
                    }
                    catch (e) {
                        console.log('Error sending support request',    e)
                        error = 'Error sending support request'
                    }
                    supportRequest.value.content.status = await getStatus(sbot)(supportRequest.key)
                    return res.json({ error, supportRequest })
                })
    } catch (error) {
        res.json({ error })
    }
}
