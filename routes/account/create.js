import sbot from "../../db";
import { orderLog } from "../../utils/orderLog";

export const createAccount = (req, res) => {
    try {
        const aboutData = orderLog(req.body);
        sbot.add(aboutData,(error,log)=>res.json(error? {error}: log))
    } catch(error) {
        res.json({error})
    }
}