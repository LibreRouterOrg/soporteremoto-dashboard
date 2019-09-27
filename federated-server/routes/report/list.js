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
        pull.map(({messages, full}) => ({
            full,
            messages: messages.filter(msg => msg.value && msg.value.content && msg.value.content.common_issue)
        })),
        pull.filter(({messages = []}) => messages.length > 0),
        pull.asyncMap(async(data, cb) => { 
            data.messages[0].value.content.status = await getStatus(data.messages[0].key)
            cb(null, data)
        }),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'object not found'})
                : res.json(msgs)
        })
    )
}