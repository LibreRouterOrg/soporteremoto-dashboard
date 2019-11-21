const drivelist = require('drivelist');

export const getPendrives = (req, res) => {
    drivelist.list().then(drives => {
        const usbDrives = drives.filter(d => d.busType=='USB');
        res.json(usbDrives)
    })
}
