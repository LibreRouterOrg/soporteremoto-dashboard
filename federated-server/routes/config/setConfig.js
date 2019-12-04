import { makePasswd } from "../../utils/makePassword"
import { getSbot } from "../../db"
import { loadOrCreateConfig, saveConfig } from "../../config"
import { writeSecretBox, formPrivate, writePublic } from "../../utils/signify"

export const setConfig = async (req, res) => {
    const password = makePasswd()
    const communityName = req.body.name

    const config = await loadOrCreateConfig();
    const genericId = config.network.communityKeys.id;
    const { secret, unsecret } = writeSecretBox(genericId, password)

    const pubCert = writePublic(formPrivate(unsecret).publicKey, true)

    saveConfig({
      ...config,
      certificates: {
        pubCert
      }
    });

    getSbot(async (sbot)=> {
      const certificates = {
        action: 'enable',
        secCert: secret,
        pubCert
      }
      sbot.publish({
        type: 'about',
        about: genericId,
        name: communityName,
        certificates
      }, () => {
        res.json({password, certificates})
      })
    })
    
}