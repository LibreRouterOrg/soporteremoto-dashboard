import sbot from "../../db";

export const getAccount = (req,res) => {
        console.log(req.body, sbot.about)
        sbot.about.latestValues({keys:['name', 'node', 'avatar'], dest: req.body.id}, (error,values)=>res.json(error? {error} : values))
}