import { getSbotAsPromise } from "../../db"


export const getAccount = async(req,res) => {
  const sbot = await getSbotAsPromise()
  sbot.about.latestValues({keys:['name', 'node', 'avatar'], dest: req.body.id}, (error,values)=>res.json(error? {error} : values))
}