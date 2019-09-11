import sbot from "../../db";

const getAccountData = (dest) => new Promise(res => {
        sbot.about.latestValues({keys:['name', 'node', 'avatar'], dest }, (error,values)=> res(Object.assign({id:dest}, values)))
})

export const listAccounts = (req,res) => {
        sbot.getVectorClock((error, vectors)=>  {
                const keys = Object.keys(vectors);
                const accounts = keys.map(getAccountData)
                Promise.all(accounts).then((users)=>res.json(users))
        })
}