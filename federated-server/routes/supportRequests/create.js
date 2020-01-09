import { getSbotAsPromise } from "../../db";
import { orderLog } from "../../utils/orderLog";
import { getStatus } from "./enrich";

export const createSupportRequest = async (req, res) => {
    /*
    content.type: 'supportRequest'
    */
    const sbot = await getSbotAsPromise()
    try {
        const supportRequestData = orderLog(req.body);
        if (supportRequestData)
            sbot.add(supportRequestData,
                async (err, supportRequest) => {
                    supportRequest.value.content.status = await getStatus(sbot)(supportRequest.key);
                    return res.json({ err, supportRequest });
                })
    } catch (error) {
        res.json({ error })
    }
}
