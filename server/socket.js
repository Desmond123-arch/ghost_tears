import {createServer} from 'http'
import { Server } from 'socket.io'
import app from './app.js'

const httpServer = createServer(app)
const io = new Server(httpServer, {cors: {origin: "*"}})
const rooms = new Map()

io.on('connection', (socket) => {
    //temp solution add connected users to list and check length
    console.log('user connected', socket.id)

    socket.on('createGame', () => {
        const roomExists = true
        let roomId = 0
        while(roomExists){
            roomId = 100000 + Math.floor(Math.random() * 900000)
            const roomExists = rooms.has(roomId)
            if(!roomExists) break;
        }
        rooms.set(roomId.toString(), new Set())
        rooms.get(roomId.toString()).add(socket.id)
        socket.join(roomId.toString())
        console.log('Created room')
        socket.emit('createdGame', {roomId})
    })

    socket.on('joinGame', (data) => {
        const { roomId } = data
        console.log('joining room: ', roomId)
        console.log(rooms.get((roomId)))
        if(!rooms.get(roomId)){
            socket.emit('error', {message:'Room does not exist'})
            return
        }
        else if(rooms.get(roomId).has(socket.id)){
            console.log('User already in the room')
            return
        }
        else if(rooms.get(roomId).size >= 2){
            socket.emit('error', {message: 'Room is full'})
            return
        }
        else{
            socket.join(roomId)
            rooms.get(roomId).add(socket.id)
            if(rooms.get(roomId).size == 2){
                const players = Array.from(rooms.get(roomId))
                socket.to(roomId).emit('beginGame', {room: players})
                socket.emit('beginGame', {room: players})
            }
        }
    })
    //receive letter entered
    socket.on('letterEntered', (letter) => {
        console.log(letter);
        //emit the letter to users
        socket.broadcast.emit('letterReceived', (letter))
    })
    socket.on('submit', (word) => {
        console.log(word);
        socket.emit('roundEnded');
    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        rooms.forEach((room, roomId) => {
            if(room.has(socket.id)){
                room.delete(socket.id)
                if(room.size == 0){
                    console.log('Deleting room:', roomId)
                    rooms.delete(roomId)
                }else{
                    socket.to(roomId).emit('playerLeft', {room: Array.from(room)})
                }
            }
        })
        socket.disconnect()
    })
})


httpServer.listen(3000, () => {
    console.log("running on http://localhost:3000")
})