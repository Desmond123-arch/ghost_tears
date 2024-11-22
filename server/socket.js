import {createServer} from 'http'
import { Server } from 'socket.io'
import app from './app.js'

const httpServer = createServer(app)

const io = new Server(httpServer, {cors: {origin: "*"}})
const connectedPlayers = []
io.on('connection', (socket) => {
    //temp solution add connected users to list and check length
    console.log('user connected', socket.id)
    socket.broadcast.emit('beginGame');

    console.log(connectedPlayers)
    // 
    //receive letter entered
    socket.on('letterEntered', (letter) => {
        console.log(letter);
        //emit the letter to users
        socket.broadcast.emit('letterReceived', (letter))
    })
    socket.on('submit', (word) => {
        console.log(word);
        socket.emit('roundEnded')
    })
})


httpServer.listen(3000, () => {
    console.log("running on http://localhost:3000")
})