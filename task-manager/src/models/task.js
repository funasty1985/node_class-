const mongoose = require('mongoose')

const Task = mongoose.model('Tasks',{
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default:false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'   //taking reference to User model
    }
})

module.exports = Task 