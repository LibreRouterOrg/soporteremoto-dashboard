
const SharedState = require("shared-state-js");
const { strMapToObj, objToStrMap } = require('obj2map');
const fetch = require('node-fetch');
const { getIps } = require('./utils/getIp');

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
    let nodes = new Set()
    myState
        .show('babeld-hosts')
        .forEach(({data}) => nodes.add(data))
        return Array.from(nodes);
}

export async function getSharedConfig() {
    const nodeData = await requestSharedState('soport-servers', false);
    myState.merge(objToStrMap(nodeData) ,false,'soport-servers');
    let servers = []
    myState
        .show('soport-servers')
        .forEach(({data}) => { servers = [...servers, data] })
        return servers;
}

export async function sendSharedConfig(config) {
    console.log(config)
    myState.insert(getIps(), {config}, 100, 'soport-servers')   
    const result = await requestSharedState('soport-servers', true)
    console.log(result)
}