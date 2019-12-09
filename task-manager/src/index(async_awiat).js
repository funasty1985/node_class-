const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// When we set a callback param of  a func async, 
// We expect the callback return a Promise obj. 
// However here we just play with the req and res of the callbacks,
// so in this case we add async without changing the behavior of the callback and its func
app.post('/users', async (req,res)=>{
    const user = new　User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then((user)=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

app.get('/users', async (req, res)=>{

    try {
        const users = await User.find({})
        res.send(users)
    }   catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()    // when the sever is not connected 
    // })
})

app.get('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        console.log(!user)
        console.log(user)
        if(!user) {
            res.status(400).send()
        }
        res.send(user)
        // !user ? res.status(404).send():res.send(user)
    }   catch(e) {
        res.status(500).send()
    }
    // const _id = req.params.id
    // console.log(_id)
    // User.findById(_id).then(user => {
    //     console.log(!user)
    //     if(!user){
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch(e =>{
    //     res.status(500).send()
    // })
})

app.patch('/users/:id', async (req,res)=>{
    const allowedUpdates = ["name", "email","password", "age"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }
    
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })

        if (!user){
            return res.status(404).send()
        } 

        res.send(user)
    } catch(e){
        res.status(404).send(e)
    }
})

app.delete('/users/:id', async (req, res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

app.post('/tasks', async(req,res)=>{
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    // task.save().then((task)=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

app.patch('/tasks/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ["completed","description"]
    const isValidOperation = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)    
    } catch (e) {
        res.status(500).send(e)
    }
    
})

app.get('/tasks',async (req,res)=>{

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e){
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    console.log(_id)

    try {
        const task = await Task.findById(_id)
        !task ? 
            res.status(400).send() :
            res.send(task)
    } catch(e){
        res.status(500).send(e)
    }  
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(400).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

app.delete('/tasks/:id', async (req,res)=> {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(400).send({error:"Not such task"})
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

