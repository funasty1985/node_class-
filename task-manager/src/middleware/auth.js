const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, "thisismynewcourse")  // return the signed item and the signning time
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
        if (!user) {
            throw new Error('no such user')
        }
        
        // we create a field in user obj and put the value of the const user in it 
        req.token = token // save the token if we want to logout by /users/logout @111 Loggin Out
        req.user = user // also note that req.user.tokens is an array of token which one of them would be req.token just above 
        // console.log(req.token)
        next()
    } catch(e) {
        res.status(401).send({error:e})
    }
}

module.exports = auth