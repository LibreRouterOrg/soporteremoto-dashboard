import sbot from "../../db";
import { orderLog } from "../../utils/orderLog";

export const createAccount = (req, res) => {
    try {
        const aboutData = orderLog(req.body);
        checkFriendship(aboutData)
        sbot.add(aboutData,(error,log)=>res.json(error? {error}: log))
    } catch(error) {
        console.err(error)
        res.json({error})
    }
}

function checkFriendship({author}, cb=console.log){
    sbot.friends.isFollowing({source: sbot.id ,dest: author}, (err, value) => {
        if (!err  && !value) {
            sbot.publish({
                    type: "contact",
                    contact: author,
                    following: true
            }, cb)
        }
        cb(null, false)
    })
}