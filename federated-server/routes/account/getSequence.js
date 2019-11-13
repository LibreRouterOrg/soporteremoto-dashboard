import pull from 'pull-stream'
import { getSbotAsPromise } from '../../db'

export const getSequence = async(req,res) => {
    const key = req.body.id
    const sbot = await getSbotAsPromise()
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