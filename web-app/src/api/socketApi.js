import io from 'socket.io-client'
import { formatComment } from './translator';

//TODO: Get soporte-remoto address form shared-state
const socket = io.connect(process.env.REACT_APP_SOCKET_URL || '/api/');
socket.on('connected', console.log)
socket.on('message', (msg) => console.log('new messages in the server', msg))
const socketApi = {
    onComment: (cb) => socket.on('comment', (message) => { console.log(message); return cb(formatComment(message))}),
    onReport: (cb) => socket.on('report', cb),
    onAccount: (cb) => socket.on('about', cb),
    status: () => ({ socket: socket.connected })
}

export default socketApi;
