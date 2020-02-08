const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

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
        res.send({ user,token})
    } catch(e) {
        res.status(400).send('login error')
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
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

router.patch('/users/me',auth , async (req,res)=>{
    const allowedUpdates = ["name", "email","password", "age"]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }
    
    try{
        // const user = req.user.toObject()
        // this will fail as toObject() will convert req.user to an object which cannot save into mongodb later
        const user = req.user
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        console.log(user)
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

router.delete('/users/me', auth, async (req, res) =>{
    
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})



const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be an image'))
        }

        cb(undefined, true)
    }
})


// 'avatar' inside single func is expected to be 
// the same name as the field carring the upload file in the json posted 
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // remeber that req.user is returned from the auth middleware
    // req.user.avatar = req.file.buffer => req.file.buffer stores the binary data, this requires the 'upload' var above not setting dest property.

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height:250 }).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Conten-Type', 'image/png') // setting header for response
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router