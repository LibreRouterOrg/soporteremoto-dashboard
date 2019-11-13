const os = require('os');
const ifaces = os.networkInterfaces();

let addresses = [];

Object.keys(ifaces).forEach((ifname)=>{
    ifaces[ifname].forEach((iface)=>{
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        addresses = [...addresses, iface.address]
    });
})

export const getIps = () => addresses.reduce((p,a)=> p===''? a: p+':'+a, '');