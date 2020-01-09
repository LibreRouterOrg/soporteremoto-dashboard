import { getSbotAsPromise } from "../../db";
import pull from "pull-stream";
import { getStatus } from "./enrich";

export const listSupportRequests = async (req, res) => {
    /*
        body.id: reportId
    */
    const sbot = await getSbotAsPromise()
    pull(
        sbot.threads.thread({ root: req.body.id, allowlist: ['supportRequest'] }),
        pull.asyncMap(async (data, cb) => {
            let newData = Object.assign({}, data)
            newData.messages = await Promise.all(
                newData.messages.map(async x => {
                    x.value.content.status = await getStatus(sbot)(x.key)
                    return x
                })
            )
            cb(null, newData)
        }),
        pull.collect((err, msgs) => {
            err
                ? res.json({ error: 'object not found' })
                : res.json(msgs)
        })
    )
}
