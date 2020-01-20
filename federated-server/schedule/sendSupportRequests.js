import ip from 'ip'
import { getPasswords, loadOrCreateConfig } from "../config"
import fetch from 'node-fetch'
import { signAndSaveKey } from "../routes/keys/addKey"
import { getSbotAsPromise } from "../db"
import { getStatus } from "../routes/supportRequests/enrich"

import pull from 'pull-stream';


const PENDING_STATUS = 'requestNoSent';
const SENT_STATUS = 'requestSent';

const saveKeys = async (sshKey, name) => {
    const sbot = await getSbotAsPromise();
    const { password } = getPasswords();
    const { network, certificates } = await loadOrCreateConfig();

    await signAndSaveKey(
        { password, sshKey, name, action: 'add' },
        { network, certificates },
        sbot
    )
}

const changeSupportRequestStatus = async (supporRequest) => {
    const sbot = await getSbotAsPromise();
    sbot.publish({
        type: 'about',
        about: supporRequest.key,
        status: SENT_STATUS,
    }, () => {});
}

const sendRequestToTier = (supportRequest) => {
    const { apiKey } = getPasswords()
    const ln6Ip = ip.address('librenet6', "ipv6")

    const toSend = {
        request: {
            librenet6: {
                ip: ln6Ip,
                public: ip.isPublic(ln6Ip)
            },
            issue: supportRequest
        },
        apiKey
    };

    const tierRequest = fetch(process.env.SUPPORT_ENDPOINT + '/support-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSend)
    })
        .then(res => res.json())
        .then(({ error }) => { if (error) throw Error(error) })
        .catch(error => {
            console.log(`Error requesting support to tier server:
                        ${error} while processing ${supportRequest}`);
        });

    tierRequest
        .then(({ sshKey, name }) => saveKeys(sshKey, name))
        .catch(error => {
            console.log(`Error saving keys for supportRequest:
                        ${error} while processing ${supporRequest}`);
        });

    tierRequest
        .then(() => { changeSupportRequestStatus(supportRequest) })
        .catch(error => {
            console.log(`Error logging supportRequest status:
                         ${error} while processing ${supporRequest}`);
        });
}

const sendPendingSupportRequestsToTier = () => {
    const sbot = getSbotAsPromise();
    pull(
        sbot.messagesByType({type: 'supportRequest'}),
        pull.asyncMap(async (msg, cb) => {
            const newMsg = Object.assign({}, msg);
            newMsg.value.content.status = await getStatus(sbot)(msg.key)
            cb(null, newMsg)
        }),
        pull.filter(msg => msg.value.content.status === PENDING_STATUS),
        pull.drain(msg => (sendRequestToTier(msg)))
    )
}

export default sendPendingSupportRequestsToTier;
