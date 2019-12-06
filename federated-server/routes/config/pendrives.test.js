const request = require('supertest');
const drivelist = require('drivelist');
import app from '../../app';
import { setupFirstRunWizardApp } from '../../sever-fbw';
const mockFs = require('mock-fs');
const fs = require('fs');
setupFirstRunWizardApp(app)


describe('getPendrives', () => {
    test('It should return only USB drives', () => {
        const pendrive = {
            "busType": "USB",
            "device": "/dev/sdb",
            "description": "My Pendrive",
            "mountpoints": [{ "path": "/mnt/my-pendrive" }],
        }
        const primaryDisk = {
            "busType": "SATA",
            "device": "/dev/sda",
            "description": "My primary disk",
            "mountpoints": [{ "path": "/" }],
        }
        drivelist.list = jest.fn().mockReturnValue([pendrive, primaryDisk]);
        return request(app).get('/pendrives').then((response) => {
            expect(JSON.stringify(response.body)).toBe(JSON.stringify([pendrive]));
        });
    });
});

describe('copyCertificate', () => {
    test('It should return error when the certificate is not configured', () => {
        jest.unmock('../../config');
        const config = require('../../config');
        config.getPublicCertificate = jest.fn().mockReturnValue(undefined);
        return request(app)
            .post('/copy-certificate')
            .send({ device: '/dev/sdb' })
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response)
                expect(response.body.error).toBe('pubCert was not found at config');
            })
    });

    test('It should return error when the requested device is not present', () => {
        jest.unmock('../../config');
        const config = require('../../config');
        config.getPublicCertificate = jest.fn().mockReturnValue('this-is-the-pubCert');
        drivelist.list = jest.fn().mockReturnValue([{
            "busType": "USB",
            "device": "/dev/sdb",
            "description": "My Pendrive",
            "mountpoints": [{ "path": "/mnt/my-pendrive" }]
        }]);
        return request(app)
            .post('/copy-certificate')
            .send({ device: '/dev/sdc' })
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response)
                expect(response.body.error).toBe('device /dev/sdc was not found');
            })
    });

    test('It should create the file into the first mountpoint of the device', () => {
        jest.unmock('../../config');
        const config = require('../../config');
        config.getPublicCertificate = jest.fn().mockReturnValue('this-is-the-pubCert');
        drivelist.list = jest.fn().mockReturnValue([{
            "busType": "USB",
            "device": "/dev/sdb",
            "description": "My Pendrive",
            "mountpoints": [{ "path": "/mnt/my-pendrive" }, { "path": "/mnt/my-pendrive-2" }]
        }]);
        mockFs({
            "/mnt/my-pendrive": {/* empty dir */}
        })
        return request(app)
            .post('/copy-certificate')
            .send({ device: '/dev/sdb' })
            .set('Accept', 'application/json')
            .then(response => {
                expect(fs.readFileSync('/mnt/my-pendrive/pubCert', {encoding: 'utf8'})).toBe('this-is-the-pubCert');
                expect(response.body.message).toBe('pubCert successfully copied to /dev/sdb');
                mockFs.restore();
            })
    });
})
