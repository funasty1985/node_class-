const add = (a,b) => {
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a + b)
        },2000)
    })
}

// add(1,2).then((sum)=>{
//     console.log(sum)

//     add(sum,5).then((sum2)=>{
//         console.log(sum2)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

// Better coding promise chainning , then making the .then() reutrn a promise object 

add(1,2).then(sum =>{
    console.log(sum)
    return add(sum, 5) // resolve(sum,5) become the arg 'sum2' of the second thebn()
}).then(sum2=>{
    console.log(sum2)
}).catch(e => {
    console.log(e)
})