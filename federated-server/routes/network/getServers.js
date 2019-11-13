import { getOnlyServers } from "../../shared-state"

export async function getServers(req, res) {
    const servers = await getOnlyServers()
    res.json(servers)
}