import { orderLog } from "../../utils/orderLog";
import { getSbotAsPromise } from "../../db";

export const setAccount = async(req, res) => {
    const sbot = await getSbotAsPromise()
    try {
        const aboutData = orderLog(req.body);
        sbot.add(aboutData,(error,log)=>res.json(error? {error}: log))
    } catch(error) {
        console.err(error)
        res.json({error})
    }
}