import { getSbotAsPromise } from "../../db";
import pull from 'pull-stream';
import { orderLog } from "../../utils/orderLog";

export const setStatusReport = async(req, res) => {
    const sbot = await getSbotAsPromise()
    try {
        const aboutData = orderLog(req.body);
        sbot.add(aboutData,(error,log)=>res.json(error? {error}: log))
    } catch(error) {
        console.err(error)
        res.json({error})
    }
}

export const getStatusReport = async(req, res) => {
    const sbot = await getSbotAsPromise()
    pull(
        sbot.about.read({ dest: req.body.id, old: true, live: false }),
        pull.filter(({value}) => value && value.content && value.content.status),
        pull.collect((error,values)=>res.json(error? {error} : values))
    )
}
