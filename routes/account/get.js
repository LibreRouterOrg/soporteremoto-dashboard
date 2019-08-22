import { getDb } from "../../db";
import pull from 'pull-stream'
import objectReducer from "../../utils/objectReducer";

export const getAccount = (req,res) => {
    const db = getDb();
    pull(
        db.query.read({query: [{$filter: { content: { key: req.body.key }}}]}),
        pull.collect((error, accounts)=>{
            if (!accounts) { accounts = []}
            const reducedAccount = objectReducer(accounts)
            if(reducedAccount.content) { return res.json(reducedAccount.content) }
            res.json({error: 'account not found'})
        })
    )
}