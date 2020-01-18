import { getOnlyServers } from "../../shared-state"

export async function getServers(req, res) {
    try {
        const servers = await getOnlyServers()
        res.json(servers)
    } catch(e) {
        console.log('Error on shared-state')
    }
}
