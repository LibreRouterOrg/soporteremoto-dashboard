import { makePasswd } from "../../utils/makePassword"
import { getSbot } from "../../db"
import { loadOrCreateConfig, saveConfig, savePasswords } from "../../config"
import { writeSecretBox, formPrivate, writePublic } from "../../utils/signify"
import fs from 'fs';
import os from 'os';
import fetch from 'node-fetch';

export const setConfig = async (req, res) => {
    const password = makePasswd()
    const communityName = req.body.name

    const config = await loadOrCreateConfig();
    const genericId = config.network.communityKeys.id;
    const { secret, unsecret } = writeSecretBox(genericId, password)

    const pubCert = writePublic(formPrivate(unsecret).publicKey, true)
    
    const tincHostname = `soporteremoto_${communityName}_${os.hostname()}`
    let tincPub;
    try {
      const configFile = '/etc/tinc/librenet6/tinc.conf';
      const pubSource = '/etc/tinc/librenet6/hosts/no_setup_yet';
      const pubDest = '/etc/tinc/librenet6/hosts/'+tincHostname;
      
      //Read pubkey and rename it
      tincPub = fs.readFileSync(pubSource).toString(); 
      fs.renameSync(pubSource, pubDest)
      
      //Save new tinc config
      let tincConfig = fs.readFileSync(configFile, { encoding: 'utf8'})
      tincConfig = tincConfig.replace(/no_setup_yet/g, tincHostname);
      fs.writeFileSync(configFile, tincConfig, { encoding: 'utf8'})

    } catch(e) {
      console.log('Error sending tinc pub key')
    }

    const certificates = {
      secCert: secret,
      pubCert
    };

    saveConfig(Object.assign(config, { certificates }))
    savePasswords({ apiKey: req.body.apiKey, password })
    
    getSbot(async (sbot)=> {
      const certificates = Object.assign({action: 'enable', certificates })
      sbot.publish({
        type: 'about',
        about: genericId,
        name: communityName,
        certificates
      }, async() => {
        if(!req.body.apiKey) return res.json({password, certificates});
        const toSend = JSON.stringify({
          apiKey: req.body.apiKey,
          config: {
            device: {
              name: os.hostname(),
              pubKey: tincPub,
            },
            communityName,
            network: {
              secretHash: config.network.secretHash,
              secretInvite: config.network.secretInvite,
              communityKeys: {
                id: config.network.communityKeys.id
              }
            }
          }
        });

        try {
          console.log('Sending to support endpoint', process.env.SUPPORT_ENDPOINT)
          const supportsubscription = await fetch(process.env.SUPPORT_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: toSend
          })
          .then(resTier => resTier.json())
          console.log('Support endpoint response', supportsubscription)
          res.json({password, certificates, supportsubscription})
        } catch(e) {
          console.log('Support endpoint error', e)
          fs.writeFileSync('toSend.json', toSend, {encoding: 'utf8'})
          res.json({password, certificates, supportsubscription: {error: true }})
        }
      })
    })
}