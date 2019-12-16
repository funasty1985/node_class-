const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// 104 Securely Storing Passwords : Part II 
// Setting schema as following allows us to make use of express middleware 
// so as to hash password for storage 
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String, // Schema Type 
            required:true,  // Schema Type option for all type
            trim: true     // Schema Type option specified to string type
        },
        email:{
            type:String,
            unique: true,
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
    
        },
        // 107 Generating Authentication Tokens
        tokens: [{
            token:{
                type:String,
                required:true
            }
        }]
    }
)

// 107 Generating Authentication Tokens 
// Generate after userSchema is instantiated 
// This is not a function , but a method for a Model instance 
// in this case is the model instance 'user' gengerated by User.findByCredentials()
// called @/routers/user.js, route for login 
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({ _id: user._id.toString() },'thisismynewcourse') // when sign , time is another param 
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

// arrow func doesn't work well in the 'this' case if bebel is not used (Remember the react course we use bebel)
userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject() // a mongoose method

    delete userObject.password
    delete userObject.tokens

    return userObject 
}

// 105 Logging in Users 
// this manipulation is only available when the model is pre-defined in mongoose.Schema 
// and this method is called by our design instead of being called when an event occurs  
// (in the case of userSchema.pre() ) 
userSchema.statics.findByCredentials = async (email, password) => {
    // (i think ) user is a  Model instance 
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user 
}

// Hash the plain text password before saving (an event hook)
// I think this is a old version of js, where arrow function doesn't bind "this" (the instantiated object) 
// so the classic anonymous function is used here 
// SchemaObj.pre is an express middleware func for manupliating the model object before it is saved 
// this first arg is the action which is save() this time 
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    // next() must called for the func to be completed 
    // if next() is not here, this callback will be hang right here 
    // and save() will never be executed 
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User 