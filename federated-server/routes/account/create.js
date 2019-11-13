import { orderLog } from "../../utils/orderLog";
import { getSbotAsPromise } from "../../db";

export const createAccount = async(req, res) => {
    const sbot = await getSbotAsPromise()
    try {
        const aboutData = orderLog(req.body);
        checkFriendship(aboutData, sbot)
        sbot.add(aboutData,(error,log)=>res.json(error? {error}: log))
    } catch(error) {
        console.err(error)
        res.json({error})
    }
}

function checkFriendship({author}, sbot, cb=console.log){
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