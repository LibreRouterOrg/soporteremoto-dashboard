import { getSbotAsPromise } from "../../db";
import { orderLog } from "../../utils/orderLog";

export const createReport = async(req, res) => {
    const sbot = await getSbotAsPromise()
    try {
        const reportData = orderLog(req.body);
        sbot.add(reportData,(a,b,c)=>res.json({a,b,c}))
    } catch(error) {
        res.json({error})
    }
}