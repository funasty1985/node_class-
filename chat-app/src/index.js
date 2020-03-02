const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)  // express do this behind the scene 
const io = socketio(server)

app.use(express.json())

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection',(socket)=>{
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)  // countUpdatted is an event emitted from the server 

    socket.on('increment', ()=> {
        count++
        // socket.emit('countUpdated', count) // event when only emitted to a particular socket
        io.emit('countUpdated', count)        // event is emiited to every socket connected
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port' + port)
})