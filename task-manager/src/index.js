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

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
        // const task = await Task.findById('5e0c5b9686607c12f899843e')
        // await task.populate('owner').execPopulate()
        // console.log(task.owner)

        // const user = await User.findById('5e0c5b7086607c12f899843c')
        // await user.populate('myTasks').execPopulate()
        // console.log(user.myTasks)
} 

main()