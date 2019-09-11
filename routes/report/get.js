import sbot from "../../db";
import pull from "pull-stream";

export const getReport = (req,res) => {
    pull(
        sbot.threads.thread({ root: req.body.id, blocklist: ['like']}),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'object not found'})
                : res.json(msgs)
        })
    )
}