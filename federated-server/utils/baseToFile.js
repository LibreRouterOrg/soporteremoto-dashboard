import uuid from 'uuid/v4';
import fs  from 'fs';

export const baseToFile = (base64) => {
    return new Promise((res, rej) => {
        const base64Data = base64.replace(/^data:image\/png;base64,/, "");
        const filename = '/tmp/'+uuid()+'.png';
        try {
            const file = fs.writeFileSync(filename, base64Data, 'base64')
            res(filename)
        } catch (e) {
            rej(e)
        }
    });
};