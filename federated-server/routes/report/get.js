import { getSbotAsPromise } from "../../db";
import pull from "pull-stream";

function getStatus(sbot) {
    return (key) => {
        return new Promise((res) => {
            sbot.about.latestValue({key: 'status', dest: key}, (err, status)=>res(status || 'open'))
        })
    }
}

export const getReport = async(req,res) => {
    const sbot = await getSbotAsPromise()
    pull(
        sbot.threads.thread({ root: req.body.id, blocklist: ['like']}),
        pull.asyncMap(async(data, cb) => { 
            let newData = Object.assign({}, data)
            newData.messages[0].value.content.status = await getStatus(newData.messages[0].key)
            cb(null, data)
        }),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'object not found'})
                : res.json(msgs)
        })
    )
}
