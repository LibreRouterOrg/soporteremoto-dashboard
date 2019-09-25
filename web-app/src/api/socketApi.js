import io from 'socket.io-client'

//TODO: Get soporte-remoto address form shared-state
const socket = io.connect('http://localhost:8080');
socket.on('connected', console.log)
socket.on('message', (msg) => console.log('new messages in the server', msg))
const socketApi = {
    onComment: (cb) => socket.on('comment', cb),
    onReport: (cb) => socket.on('report', cb),
    onAccount: (cb) => socket.on('about', cb),
    status: () => ({ socket: socket.connected })
}
    
export default socketApi;