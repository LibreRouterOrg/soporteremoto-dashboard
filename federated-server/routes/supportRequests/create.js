import { getSbotAsPromise } from "../../db"
import { orderLog } from "../../utils/orderLog"
import { getStatus } from "./enrich"

export const createSupportRequest = async (req, res) => {
    /*
    content.type: 'supportRequest'
    */
    const sbot = await getSbotAsPromise()
    const supportRequestData = orderLog(req.body);
    sbot.add(supportRequestData, async (error, supportRequest) => {
        if (error) {
            const errorMsg = "Error creating support request";
            console.log(errorMsg, error);
            res.json({error: errorMsg});
        } else {
            supportRequest.value.content.status = await getStatus(sbot)(supportRequest.key);
            res.json({supportRequest: supportRequest});
        }
    });
}
