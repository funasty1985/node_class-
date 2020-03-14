const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)  // express do this behind the scene 
const io = socketio(server)

app.use(express.json())

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// 'connection' and 'disconnect' are the build in event 
io.on('connection',(socket)=>{
    console.log('New WebSocket connection')

    const msg = 'Welcome! You are connected.'

    socket.emit('message', msg)

    socket.broadcast.emit('message', 'A new user has joined')  // the message will be sent to every socket except to the one connected to this current socket
    
    socket.on('sendLocation', (coords, callback)=> {
        io.emit('message', `http://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()      
    })

    socket.on('clientMsg', (clientMsg, callback) => {
        const filter = new Filter()

        if(filter.isProfane(clientMsg)){
            return callback('Profanity is not allowed')
        }

        io.emit('message', clientMsg )
        callback()   // calling the acknowledgement function
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port' + port)
})