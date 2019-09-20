/*
    User localStorage as local cache for offline use
*/
import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

const CACHE_TIME = 3000;
const log = (msg) => console.log('localFetch - ', msg)

function sortKeys(x) {
    if (typeof x !== 'object' || !x)
        return x;
    if (Array.isArray(x))
        return x.map(sortKeys);
    return Object.keys(x).sort().reduce((o, k) => ({...o, [k]: sortKeys(x[k])}), {});
}

const hashRequest = (url, options= {}) => {
    const objectToHash = sortKeys({options, url})
    const requestStings = JSON.stringify(objectToHash)
    const hash = nacl.hash(Uint8Array.from(requestStings))
    return naclUtil.encodeBase64(hash);
}

const isOld = (timestamp=0) => {
    const calc = Date.now() > timestamp + CACHE_TIME
    log(calc? 'cache is old': 'cache is valid')
    return calc
}

const getCached = (hash) => {
    try {
        const cachedString = localStorage.getItem(hash)
        log(`cache ${hash} found`)
        return JSON.parse(cachedString)
    }
    catch {
        log(`cache ${hash} not found`)
        return false
    }
}

const saveOrUpdate = (hash, res) => {
    log(`saveOrUpdate cache ${hash}`)
    localStorage.setItem(hash, JSON.stringify({ timestamp: Date.now(), res }))
}

export const newFetch = (url, options, hash) => {
    log(`fetching new request - ${hash}`)
    return fetch(url, options)
        .then((res) => res.json())
        .then(json => {
            saveOrUpdate(hash, json)
            return Promise.resolve({ res: json, cache: false, offline: false })
        })
}

const noCacheFetch = (url, options) => {
    return new Promise(res => {
        fetch(url, options)
            .then((res) => res.json())
            .then((json) => res({res: json, offline: false, cache: false }))
            .catch((error) => res({ offline: true, cache: false, error }))
    });
}

export const retryFetch = (url, options, hash, old) => {
    log(`refetching old request - ${hash}`)
    return new Promise((res) => {
        fetch(url, options)
            .then((res) => res.json())
            .then(json => {
                saveOrUpdate(hash, json)
                res({res: json, cache: false, offline: false})
            })
            .catch(error => {
                log(`refetching old request faild, sending old request result- ${hash}`)
                res({ res: old, cache: true, offline: true, error: error})
            })
    })
}

export const localFetch = (useOffline) => {
    return (url, options) => {
        //Not use cache
        if (!useOffline) { return noCacheFetch(url, options); }
        //Use cache
        const hash = hashRequest(url, options)
        const cached =  getCached(hash)
        //If not exist make the request
        if (!cached) { return newFetch(url, options, hash); }
        //If is old try to reload
        if (isOld(cached.timestamp)) { return retryFetch(url, options, hash, cached.res) }
        //If cache is valid return it
        console.log(cached.res)
        return Promise.resolve({res: cached.res, cache: true, offline: false});
    }
}

