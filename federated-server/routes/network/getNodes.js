import { loadOrCreateConfig } from "../../config";
import sbot from '../../db';
import pull from 'pull-stream';
import { flatToUnique } from "../../utils/faltToUnique";

export const getNodes = async function(req, res) {
    const { network } = await loadOrCreateConfig();
    const genericId = network.communityKeys.public;
    pull(
        sbot.about.read({ dest: genericId, old: true, live: false }),
        pull.filter(({value}) => value.content.nodes),
        pull.map(({value}) => value.content.nodes),
        pull.collect((error, results = []) => {
            if (error) { return; }
            const nodes = results.reduce(flatToUnique,[])
            res.json({nodes});
        })
    )
}
