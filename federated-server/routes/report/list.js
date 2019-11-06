import pull from 'pull-stream';
import { removeFirst } from '../../utils/removeFirst';
import { extractOption } from "../../utils/extractOption";
import { getSbotAsPromise } from '../../db';


function getStatus(sbot) {
    return (key) => {
        return new Promise((res) => {
            sbot.about.latestValue({key: 'status', dest: key}, (err, status)=>res(status || 'open'))
        })
    }
}

export const listReports = async(req,res) => {
    const sbot = await getSbotAsPromise()
    if(!req.body.gt) {
        let d = new Date()
        d.setMonth(d.getMonth()-1);
        req.body.gt = d.getTime();
        req.body.lt = Date.now();
    }

    pull(
        sbot.threads.public({allowlist: 'reports'}),
        pull.filter(onlyValidThreads),
        pull.map(removeInvalidMsg),
        pull.asyncMap(injectStatus(sbot)),
        pull.map(reduceComments),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'object not found'})
                : res.json(msgs)
        })
    )
}

/* Add the last status to the report. */
const injectStatus = (sbot) => async(data, cb) => {
    let newData = Object.assign({}, data)
    newData.messages[0].value.content.status = await getStatus(sbot)(newData.messages[0].key)
    return cb(null, data)
}

/* Check that the first message of the thread is correctly formulated and is valid. */
function onlyValidThreads({messages = []}) {
    return messages.length > 0 && messages[0].value && messages[0].value.content && messages[0].value.content.common_issue
}

/* Removes from the thread messages that are not comments or report messages */ 
function removeInvalidMsg({messages = [], full}) {
    return { full, messages: messages.filter(msg => msg.value)}
}

/* */
function reduceComments({messages = [], full}) {    
    messages[0].value.content.comments = messages.filter(removeFirst).map(extractOption('key'))
    return messages[0]
}