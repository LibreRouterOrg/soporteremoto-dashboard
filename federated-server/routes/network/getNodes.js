import { loadOrCreateConfig } from "../../config";
import { getSbotAsPromise } from "../../db";
import pull from 'pull-stream';
import { flatToUnique } from "../../utils/flatToUnique";

export const getNodes = async function(req, res) {
    const sbot = await getSbotAsPromise()
    const { network } = await loadOrCreateConfig();
    const genericId = network.communityKeys.id;
    pull(
        sbot.about.read({ dest: genericId, old: true, live: false }),
        pull.filter(({value}) => value.content.nodes),
        pull.map(({value}) => value.content.nodes),
        pull.collect((error, results = []) => {
            console.log(error, results)
            if (error) { return; }
            const nodes = results.reduce(flatToUnique,[])
            res.json({nodes});
        })
    )
}
