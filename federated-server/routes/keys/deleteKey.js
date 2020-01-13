import { loadOrCreateConfig } from "../../config"
import { getSbotAsPromise } from "../../db"
import { signAndSaveKey } from "./addKey"

export const deleteKey = async (req, res) => {
    const sbot = await getSbotAsPromise()
    const config = await loadOrCreateConfig()
        
    // Validate request body
    const { password, sshKey, name } = req.body
    if (!password || !sshKey || !name ) return res.json({error: 'password, name or sshKey missing'})

    try {
        const response = await signAndSaveKey({ password, sshKey, name, action: 'delete' }, config, sbot)
        res.json(response)
    }    
    catch(e) {
        setTimeout(()=>res.json({error: 'wrong password', e}),3000)
    }

}
