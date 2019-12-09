require ('../src/db/mongoose')
const User = require('../src/models/user')

// 5d283d10987db525b16a977c
// mongoose internally handles the $set operator @ findByAndUpdate().
// findByIdAndUpdate returns a Promise object which provides the matched user document when resolved 
// User.findByIdAndUpdate("5d283d10987db525b16a977c",{age : 1 }).then(user => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch(e=>{
//     console.log(e)
// })


//
const updateAgeCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return {user,count}
}

updateAgeCount("5d283d10987db525b16a977c",2).then(({count})=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})