import { baseToFile } from "../../utils/baseToFile";
import { getSbotAsPromise } from "../../db";
import pull from 'pull-stream';
import file from 'pull-file'

export const uploadBlob = async(req, res) => {
    const sbot = await getSbotAsPromise()
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