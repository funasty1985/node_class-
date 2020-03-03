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

io.on('connection',(socket)=>{

    const msg = 'Welcome! You are connected.'

    socket.emit('message', msg)

    socket.on('clientMsg', (clientMsg) => {
        io.emit('message', clientMsg )
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port' + port)
})