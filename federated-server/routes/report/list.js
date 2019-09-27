import sbot from "../../db";
import pull from 'pull-stream';


function getStatus(key) {
    return new Promise((res) => {
        sbot.about.latestValue({key: 'status', dest: key}, (err, status)=>res(status || 'open'))
    })
}

export const listReports = (req,res) => {
    if(!req.body.gt) {
        let d = new Date()
        d.setMonth(d.getMonth()-1);
        req.body.gt = d.getTime();
        req.body.lt = Date.now();
    }

    pull(
        sbot.threads.public({allowlist: 'reports'}),
        pull.filter(onlyValidThreas),
        pull.map(removeInvalidMsg),
        pull.asyncMap(injectStatus),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'object not found'})
                : res.json(msgs)
        })
    )
}

/* Add the last status to the report. */
async function injectStatus(data, cb) {
    data.messages[0].value.content.status = await getStatus(data.messages[0].key)
    cb(null, data)
}

/* Check that the first message of the thread is correctly formulated and is valid. */
function onlyValidThreads({messages = []}) {
    return messages.length > 0 && messages[0].value && messages[0].value.content && messages[0].value.content.common_issue
}

/* Removes from the thread messages that are not comments or report messages */ 
function removeInvalidMsg({messages = [], full}) {
    return { full, messages: messages.filter(msg => msg.value)}
}