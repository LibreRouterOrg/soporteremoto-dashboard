import pull from 'pull-stream'
import sbot from "../../db";

export const getSequence = (req,res) => {
    const key = req.body.id
    sbot.getVectorClock(( err, vector)=>{
        sbot.getAtSequence([key, vector[key]], (err, msg)=> {
            if(err) { 
                res.json({sequence: 1, previous: null})
                return;
            }
            const {sequence} = msg.value;
            return res.json({sequence: sequence+1, previous: msg.key})
        })
    })
}