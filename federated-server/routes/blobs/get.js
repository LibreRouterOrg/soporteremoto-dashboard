import pull from 'pull-stream';
import toPull from 'stream-to-pull-stream';
import ident from 'pull-identify-filetype';
import mime from 'mime-types';
import { getSbotAsPromise } from '../../db';


/* Search the hash in the network and wait for it */
const waitFor = (sbot) => (hash, cb) => {
  sbot.blobs.has(hash, function (err, has) {
    if (err) return cb(err);
    if (has) {
      cb(null, has);
    } else {
      sbot.blobs.want(hash, cb);
    }
  });
}

/* Add headers and body to response */
function respondSource(res, source){
  pull(
    source,
    ident(function (type) {
      if (type) res.writeHead(200, {
        'Content-Type': mime.lookup(type)
      });
    }),
    toPull.sink(res)
  );
}

/* Main function */ 
export const getBlob = async(req, res) => {
  const sbot = await getSbotAsPromise()
  const hash = decodeURIComponent(req.params.hash);
  waitFor(sbot)(hash, function (_, has) {
    if (!has) return res.status(404).send('File not found');
    respondSource(res, sbot.blobs.get(hash));
  });
};