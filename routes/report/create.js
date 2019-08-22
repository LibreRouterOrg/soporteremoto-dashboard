import { getDb } from "../../db";

export const createReport = (req, res) => {
    const db = getDb();
    try {
        const reportData = req.body;
        // TODO: Add validation
        db.append({type: 'report', content: reportData }, () => {
            res.json({data: { status: "ok" }})
        })
    } catch(error) {
        res.json({error})
    }
}