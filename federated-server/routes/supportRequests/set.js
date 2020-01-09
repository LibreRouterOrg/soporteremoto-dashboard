import { getSbotAsPromise } from "../../db";
import { orderLog } from "../../utils/orderLog";

export const setSupportRequest = async (req, res) => {
    const sbot = await getSbotAsPromise()
    try {
        const aboutData = orderLog(req.body);
        sbot.add(aboutData, (error, log) => res.json(error ? { error } : log));
    } catch (error) {
        console.err(error);
        res.json({ error });
    }
}
