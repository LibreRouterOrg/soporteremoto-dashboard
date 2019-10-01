import sbot from "../../db";

export const getAccount = (req,res) => {
        sbot.about.latestValues({keys:['name', 'node', 'avatar'], dest: req.body.id}, (error,values)=>res.json(error? {error} : values))
}