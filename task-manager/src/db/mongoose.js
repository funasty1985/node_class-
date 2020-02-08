const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false // 93 Promise Chaining , last part
})