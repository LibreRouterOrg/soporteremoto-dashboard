
const SharedState = require("shared-state-js");
const { strMapToObj, objToStrMap } = require('obj2map');
const fetch = require('node-fetch');
const { getIps } = require('./utils/getIp');

// Create a shared-state object
const myState = new SharedState({author: 'soporteremoto'})

const requestSharedState = (table, sync) => {
    const hostUrl = `http://thisnode.info/cgi-bin/shared-state/${table}`;
    return fetch(hostUrl, {
        method: 'POST',
        body: sync? JSON.stringify(strMapToObj(myState.show(table))) : []
    })
    .then(res => res.json())
    .catch(() => console.log('Shared-state not found on thisnode.info'));
}

export async function getOnlyServers(){
    const data = await getSharedConfig()
    return data
        .filter(value => value.type === 'config')
        .map(({config}) => config.network)
}

export async function getActualNodes(){
    //Merge node data into my shared-state
    const nodeData = await requestSharedState('babeld-hosts', false);
    myState.merge(objToStrMap(nodeData) ,false,'babeld-hosts');
    //Format result to get a hostname list
    let nodes = new Set()
    myState
        .show('babeld-hosts')
        .forEach(({data}) => nodes.add(data))
        return Array.from(nodes);
}

export async function getSharedConfig() {
    const nodeData = await requestSharedState('soporteremoto', false);
    myState.merge(objToStrMap(nodeData) ,false,'soporteremoto');
    let servers = []
    myState
        .show('soporteremoto')
        .forEach(({data}) => { data.type === 'config' ? servers = [...servers, data]: false })
    return servers;
}

export async function sendSharedConfig(config) {
    myState.insert(getIps(), {type: 'config', config}, 100, 'soporteremoto')   
    const result = await requestSharedState('soporteremoto', true)
    console.log(result)
}