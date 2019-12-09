// 95 Async/Await

// async fun structure 

// In a async func , returning a true value is like resolve(value) and the value is capture by then(value=>{})
// while throw an error is like reject(error) and the error is catch by .catch() 
// const doWork = async () => {
//     throw new Error('Sth went wrong')
//     return "Fu"
// }

// doWork().then(result=> {
//     console.group('result',result)
// }).catch(e=>{
//     console.log('e',e)
// })

const add = (a,b) => {
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            if (a<0 || b<0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        },2000)
    })
}

const doWork = async () => {
    const sum = await add(1,99) // similar to add(1,99).then(...)
    const sum2 = await add(sum,50)
    const sum3 = await add(sum2,3) 
    return sum3  // sum3 is a promise object 
}

doWork().then(result=> {
    console.group('result',result)
}).catch(e=>{
    console.log('e',e)
})

// async-await can handle async operation (promise obj involved operation) in sync syntax 
// func with asysnc at the beginning returns a promise obj 
// await can wait for a async call and capture the value in a variable . 
