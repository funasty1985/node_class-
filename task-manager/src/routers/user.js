const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new　User(req.body)

    try {
        // (i think ), although tokens field is a require field @ /models/user.js 
        // we can user.save() before assigning value to the tokens field 
        // It is because, we define the field in mongoose.Schema but not in mongoose.Model directly,
        // which allow such flexibility. 
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// 105 loggin in User 
router.post('/users/login',async (req, res) => {
    try {
        // User.findByCredentials() is a custom func @ 105
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // user.generateAuthtoken() is a custom func @ 107
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log('this there an user?', user)
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res)=>{
    
    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // }   catch (e) {
    //     res.status(500).send(e)
    // }
})

router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        console.log(!user)
        console.log(user)
        if(!user) {
            res.status(400).send()
        }
        res.send(user)
     
    }   catch(e) {
        res.status(500).send()
    }
    
})

router.patch('/users/:id', async (req,res)=>{
    const allowedUpdates = ["name", "email","password", "age"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }
    
    try{
        // 104 securely sotring password 
        const user = await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()

        // the line below is the assiging the user without touching the express middleware for securely storing password@104
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true })
        // the reason why the line above bypasses the express middleware we have set up @ ../models/user is it doesn't call save()

        if (!user){
            return res.status(404).send()
        } 

        res.send(user)
    } catch(e){
        res.status(404).send(e)
    }
})

router.delete('/users/:id', async (req, res) =>{
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


module.exports = router