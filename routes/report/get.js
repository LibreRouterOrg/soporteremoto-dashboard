import { getDb } from "../../db";
import pull from 'pull-stream'
import objectReducer from "../../utils/objectReducer";

export const getReport= (req,res) => {
    const db = getDb();
    pull(
        db.query.read({query: [{$filter: { content: { key: req.body.key }}}]}),
        pull.collect((error, reports)=>{
            if (!reports) { reports = []}
            const reducedReports = objectReducer(reports)
            if(reducedReports) { return res.json(reducedReports) }
            res.json({error: 'account not found'})
        })
    )
}