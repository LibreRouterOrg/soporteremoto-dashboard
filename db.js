import OffsetLog from 'flumelog-offset'
import codec from 'flumecodec'
import Flume from 'flumedb'


import Query from './reducers/query';
import accountReducer from './reducers/accountReducer';
import reportReducer from './reducers/reportReducer';


// Setup db
const filename = './log/flume.db'
const log = OffsetLog(filename, {codec: codec.json})
const db = Flume(log)
    .use('accounts', accountReducer)
    .use('reports', reportReducer)
    .use('query', Query)


export const getDb = () => db
    

