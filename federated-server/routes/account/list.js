import { getSbotAsPromise } from "../../db";

const getAccountData = (sbot) => (dest) => new Promise(res => {
        sbot.about.latestValues({keys:['name', 'node', 'avatar'], dest }, (error,values)=> res(Object.assign({id:dest}, values)))
})

export const listAccounts = async(req,res) => {
        const sbot = await getSbotAsPromise()
        sbot.getVectorClock((error, vectors)=>  {
                const keys = Object.keys(vectors);
                const accounts = keys.map(getAccountData(sbot))
                Promise.all(accounts).then((users)=>res.json(users))
        })
}