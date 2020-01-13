import fs from 'fs';
import fetch from 'node-fetch';

export async function resendToSupport(){
    try {
        let json = fs.readFileSync('./toSend.json', { encoding: 'utf8'})
        console.log(json)
        const response = await fetch(process.env.SUPPORT_ENDPOINT+'/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        })
        .then(res => res.json())

        if(!response) return console.log('Error sending toSend.json')
        fs.unlinkSync('./toSend.json')
        console.log('Success, configuration sended to SoporteRemoto', response)

    } catch (e) {
        console.log('Error sending toSend.json', e)
    }
}