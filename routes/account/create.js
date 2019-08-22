import { getDb } from "../../db";

export const createAccount = (req, res) => {
    const db = getDb();
    try {
        const aboutData = req.body;
        // TODO: Add validation
        db.append({type: 'account', content: aboutData}, () => {
            res.json({data: { status: "ok" }})
        })
    } catch(error) {
        res.json({error})
    }
}