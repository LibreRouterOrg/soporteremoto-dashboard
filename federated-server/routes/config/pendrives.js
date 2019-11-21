const fs = require('fs');

export const getPendrives = (req, res) => {
    fs.readdir('/dev/disk/by-id/', (err, items) => {
        let usb_devices = items
            .filter(x => x.startsWith('usb'))
            .map(x => x.replace('usb-', '').split(':')[0])
        usb_devices = [...new Set(usb_devices)]
        res.json(usb_devices);
    })
}
