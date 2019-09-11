import sbot from "../../db";

export const getComment = (req,res) => {
    sbot.get(req.body.id, (err, log) => {
        err
            ? res.json({error: 'object not found'})
            : res.json(log.value)
    })
}