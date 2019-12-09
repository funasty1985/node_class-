require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5d2834e70b1b9e2307e1f3bc").then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then(count=>{
//     console.log(count)
// }).catch( e => {
//     console.log(e)
// })

// 96. Async/Await: partII
const deleteTaskAndCount = async (id)=> {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount("5d29349aa7d7a42587b8c2c4").then(count=>{
    console.log(count)
}).catch(e=>{
    console.log(e)
})