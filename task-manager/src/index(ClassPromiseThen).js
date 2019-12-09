const express = require('express')
// we just want mongoose.js to run (connect mongoose to mongodb) but not exporting anything
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// this will automatically parse incoming json to an object so we can access in our request handlers
// this line has to provide when the post method is used, otherwise the req.boy of app.post() will be undefined
app.use(express.json())

app.post('/users', (req,res)=>{
    const user = new　User(req.body)

    user.save().then((user)=>{
        res.status(201).send(user)
    }).catch((e)=>{
        // in REST-api even there is a error catched, the server will return a error 200 response 
        // which will be missleading to user. 
        // So we have to command the response to 400 by res.status(400), and it have to be done before res.send()
        res.status(400).send(e)
    })
})

// When the first of arg of Model.find() is {} , it fetched all documents
// Model.find({}) returns a promise obj
app.get('/users',(req, res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()    // when the sever is not connected 
    })
})

//:id is a route parameter which is used to capture dynamic content
// its value can later be captured by req.params.id
// Mode.findById() will take in a string id and automatically convert it to Objectid
app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    console.log(_id)
    // if there is no such user , findById will return null
    User.findById(_id).then(user => {
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }).catch(e =>{
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)

    task.save().then((task)=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    console.log(_id)
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

