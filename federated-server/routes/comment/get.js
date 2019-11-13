import { getSbotAsPromise } from "../../db";

export const getComment = async(req,res) => {
    const sbot = await getSbotAsPromise();
    sbot.get(req.body.id, (err, log) => {
        err
            ? res.json({error: 'object not found'})
            : res.json(log.value)
    })
}