import sbot from "../../db";
import pull from 'pull-stream';

export const listReports = (req,res) => {
    if(!req.body.gt) {
        let d = new Date()
        d.setMonth(d.getMonth()-1);
        req.body.gt = d.getTime();
        req.body.lt = Date.now();
    }

    pull(
        sbot.messagesByType({type: 'report', live: false, gt: req.body.gt, lt: req.body.lt }),
        pull.collect((err, msgs) => {
            err
                ? res.json({error: 'reports not found'})
                : res.json(msgs)
        })
    )
}