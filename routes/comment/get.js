import { getDb } from "../../db";
import pull from 'pull-stream'
import objectReducer from "../../utils/objectReducer";

export const getComment = (req,res) => {
    const db = getDb();
    pull(
        db.query.read({query: [{$filter: { content: { key: req.body.key }}}]}),
        pull.collect((error, comments)=>{
            if (!comments) { comments = []}
            const reducedComment = objectReducer(comments)
            if(reducedComment.key) { return res.json(reducedComment) }
            res.json({error: 'comment not found'})
        })
    )
}