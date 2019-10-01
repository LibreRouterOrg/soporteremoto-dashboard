
const SharedState = require("shared-state-js");
const { strMapToObj, objToStrMap } = require('obj2map');
const fetch = require('node-fetch');
const pull = require('pull-stream')
const { genericId } = require('./config')
const { flatToUnique } = require("./utils/faltToUnique");

// Create a shared-state object
const myState = new SharedState({author: 'soporte-remoto'})

const requestSharedState = (table, sync) => {
    const hostUrl = `http://thisnode.info/cgi-bin/shared-state/${table}`;
    return fetch(hostUrl, {
        method: 'POST',
        body: sync? JSON.stringify(strMapToObj(myState.show(table))) : []
    })
    .then(res => res.json())
    .catch(err => console.log('Http merge error', err));
}


export async function getActualNodes(){
    //Merge node data into my shared-state
    const nodeData = await requestSharedState('babeld-hosts', false);
    myState.merge(objToStrMap(nodeData) ,false,'babeld-hosts');
    //Format result to get a hostname list
    let nodes = []
    myState
        .show('babeld-hosts')
        .forEach(babeldHost => nodes = nodes.indexOf(babeldHost.data) !== -1 ? nodes: [...nodes, babeldHost.data])
        return nodes;
}

export function sendNodesToDb(nodeList = [], sbot) {
    pull(
        sbot.about.read({ dest: genericId, old: true, live: false }),
        pull.filter(({value}) => value.content.nodes),
        pull.map(({value}) => value.content.nodes),
        pull.collect((error, results = []) => {
            if (error) { return; }
            const oldNodes = results.reduce(flatToUnique)
            const newNodes = nodeList.filter(node => oldNodes.indexOf(node ) === -1);
            if (newNodes.length > 0) {
                sbot.publish({type: 'about', about: genericId, nodes: newNodes}, () => console.log('New nodes detected', newNodes))
            }   
        })
    )
}

