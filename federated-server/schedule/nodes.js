import pull from 'pull-stream';
import { flatToUnique } from "../utils/flatToUnique";
import { loadOrCreateConfig } from '../config';


export async function sendNodesToDb(nodeList = [], sbot) {
    const { network } = await loadOrCreateConfig();
    const genericId = network.communityKeys.id;
    pull(
        sbot.about.read({ dest: genericId, old: true, live: false }),
        pull.filter(({value}) => value.content.nodes),
        pull.map(({value}) => value.content.nodes),
        pull.collect((error, results = []) => {
            if (error) { return; }
            const oldNodes = results.reduce(flatToUnique, [])
            const newNodes = nodeList.filter(node => oldNodes.indexOf(node ) === -1);
            if (newNodes.length > 0) {
                sbot.publish({type: 'about', about: genericId, nodes: newNodes}, () => console.log('New nodes detected', newNodes))
            }   
        })
    )
}
