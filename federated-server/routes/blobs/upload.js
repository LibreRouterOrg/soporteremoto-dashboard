import { baseToFile } from "../../utils/baseToFile";
import sbot from "../../db";
import pull from 'pull-stream';
import file from 'pull-file'

export const uploadBlob = async(req, res) => {
    const filePath = await baseToFile(req.body.base64);
    if  (!filePath) { res.json({error: true}); return; }
    pull(
        file(filePath),
        sbot.blobs.add(function (error, id) {
            if(error){ return res.json(error); }
            res.json({id})
        })
    )
}