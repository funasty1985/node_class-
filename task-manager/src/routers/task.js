const express = require("express")
const Task = require("../models/task")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post('/tasks', auth, async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ["completed","description"]
    const isValidOperation = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        // the code above is the break down of the following line where task.save() is called. 
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if (!task){
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)    
    } catch (e) {
        res.status(500).send(e)
    }
    
})

router.get('/tasks',auth , async (req,res)=>{
    const user = req.user
    try {
        await user.populate('myTasks').execPopulate()
        res.send(user.myTasks)
    } catch (e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth , async (req,res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }  
})

router.delete('/tasks/:id',auth, async (req,res)=> {
    
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(400).send({error:"Not such task"})
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router