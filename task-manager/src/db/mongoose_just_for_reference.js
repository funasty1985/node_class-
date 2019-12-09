const mongoose = require('mongoose')
const validator = require('validator')
                                            // database name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app',{
    useNewUrlParser: true,
    useCreateIndex:true
})


// defining a model.
// first arg is name of the model. It's lower case version will become the name the collection at mongodb 
const User = mongoose.model('User',{
    name:{
        type: String, // Schema Type 
        required:true,  // Schema Type option for all type
        trim: true     // Schema Type option specified to string type
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if (! validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    age:{
        type: Number,
        default:0,
        // costom validation 85
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a poisitive number')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength:7,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }

    }
})

// create an instance of the model
// const me = new User({
//     name: '    Andrew',
//     email:"TONY.f.liang@Gmail.com    ",
//     password:"25129965    "
// })

// save the model into the db 
// me.save() return a Promise object where it return me as the Promise resolved 
// plus a field __v which store the version of the object saved and managed by mongoose

// me.save().then((me) =>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)
// })

//84 Creating a mongoose Model 
const Task = mongoose.model('Tasks',{
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default:false
    }
})

const task = new Task({
    description:'Go travel with Qing',

})

task.save().then((task)=>{
    console.log(task)
}).catch((error)=>{
    console.log(error)
})