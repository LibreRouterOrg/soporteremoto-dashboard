import { getDb } from "../../db";

export const createComment = (req, res) => {
    const db = getDb();
    try {
        const commentData = req.body;
        // TODO: Add validation
        db.append({type: 'comment', content: commentData }, () => {
            res.json({data: { status: "ok" }})
        })
    } catch(error) {
        res.json({error})
    }
}