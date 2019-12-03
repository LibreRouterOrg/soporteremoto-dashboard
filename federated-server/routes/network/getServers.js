import { getOnlyServers } from "../../shared-state"

export async function getServers(req, res) {
    res.setTimeout(4000,()=> {
        res.json({ error: 'timeout' })
    })
    try {
        const servers = await getOnlyServers()
        res.json(servers)
    } catch(e) {
        console.log('Error on shared-state')
    }
}