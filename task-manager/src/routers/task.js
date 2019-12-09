const express = require("express")
const Task = require("../models/task")

const router = new express.Router()

router.post('/tasks', async(req,res)=>{
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ["completed","description"]
    const isValidOperation = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        // 104 Securely Storing Passwords 
        const task = await Task.findById(req.params.id)

        updates.forEach((update)=>{
            task[update] = req.body[update]
        })

        await task.save()

        // the code above is the break down of the following line where task.save() is called. 
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)    
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.get('/tasks',async (req,res)=>{

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req,res)=>{
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
})

router.delete('/tasks/:id', async (req,res)=> {
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

module.exports = router