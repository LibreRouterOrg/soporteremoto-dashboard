import sbot from "../../db";
import { orderLog } from "../../utils/orderLog";

export const createComment = (req, res) => {
    try {
        const commentData = orderLog(req.body);
        sbot.add(commentData,(a,b,c)=>res.json({a,b,c}))
    } catch(error) {
        res.json({error})
    }
}