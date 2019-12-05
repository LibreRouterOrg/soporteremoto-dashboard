import { getPublicCertificate } from '../../config';
const fs = require('fs');
const path = require('path');
const drivelist = require('drivelist');

export const getPendrives = (req, res) => {
    getUsbDrives().then(drives => res.json(drives));
}

export const copyCertificate = async (req, res) => {
    // Read certificate
    const pubCert = await getPublicCertificate();
    if (!pubCert) {
        res.json({ 'error': 'pubCert was not found at config' });
        return;
    }
    // Search for usb device
    let device = null;
    let deviceName = req.body.device;
    getUsbDrives().then(drives => {
        drives = drives.filter(d => d.device === deviceName);
        if (drives.length == 0) {
            res.json({ 'error': 'device ' + deviceName + ' was not found' });
            return;
        }
        device = drives[0];
        const mountpointPath = device.mountpoints[0].path;
        const certPath = path.join(mountpointPath, 'pubCert');
        fs.writeFileSync(certPath, pubCert);
        res.json({ 'message': 'pubCert successfully copied to ' + deviceName })
    })
}
