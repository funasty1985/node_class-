const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generatedMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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


    socket.on('sendLocation', (coords, callback)=> {
        
        const url = `http://google.com/maps?q=${coords.latitude},${coords.longitude}`
        
        io.emit('locationMessage', generateLocationMessage(url))
        callback()      
    })

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options }) // socket.id is unqiue for every socket connection

        if (error) {
           return callback(error)
        }

        socket.join(user.room) 

        socket.emit('message', generatedMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generatedMessage(`${user.username} has joined!`)) 

        callback() // acknowledge function call for successful connection
    })

    socket.on('clientMsg', (clientMsg, callback) => {
        const filter = new Filter()

        if(filter.isProfane(clientMsg)){
            return callback('Profanity is not allowed')
        }

        io.to('Center City').emit('message', generatedMessage(clientMsg) )
        callback()   // calling the acknowledgement function
    })

    socket.on('disconnect', () => {
        const exitingUser = removeUser(socket.id)

        if(exitingUser){
            io.to(exitingUser.room).emit('message', generatedMessage(`${exitingUser.username} has left!`))
        }

        
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port' + port)
})