import { getSbotAsPromise } from "../../db";
import pull from "pull-stream";

function getStatus(sbot) {
    return (key) => {
        return new Promise((res) => {
            sbot.about.latestValue(
                { key: 'status', dest: key },
                (err, status) => res(status || 'requestNoSent')
            );
        });
    }
};

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
