import { getSbotAsPromise } from "../../db";
import { orderLog } from "../../utils/orderLog";

export const createSupportRequest = async (req, res) => {
    /*
    content.type: 'supportRequest'
    */
    const sbot = await getSbotAsPromise()
    try {
        const supportRequestData = orderLog(req.body);
        if (supportRequestData)
            sbot.add(supportRequestData,
                (err, supportRequest) => {
                    return res.json({ err, supportRequest });
                })
    } catch (error) {
        res.json({ error })
    }
}
