const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// 108 Express Middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET'){
//         res.send('GET requests are disable')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send("Site is currently down")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function (){
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))

// // { name: 'Hal', toJSON: [Function] }
// // {"name":"Hal"}