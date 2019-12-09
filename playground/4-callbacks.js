// 35. The Callback Function
// A callbakc is a function which is an argument of another function

setTimeout(()=>{
    console.log('Two seconds are up')
},2000)

const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name)=>{
    return name.length <= 4
})

// -----------------------------------------------

// const geocode = (address, callack) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude:0
//         }
    
//         return data
//     },2000)
// }

// const data = geocode('Philadephia')
// console.log(data)

// if we deploy the definition of geocode above , data will be undefined.
// It is because geocode function isn't return anything. 
// There isn't return statement directly inside geocode function where it finishes almost immediately,
// and if you don't return something from a function, JS will implicitly return undefined. 
// Although there is a return statement in geocode, it is nested in another (async Node api)function.
// The return parthern is no longer going to work for us when we start to do asynchronous things inside of geocode.
// THat's where the callabck pattern is going to come into play. 
// See the gecode definition below. 

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude:0
//         }
    
//         callback(data)
//     },2000)
// }

// geocode('Philadephia', (resultData) =>{
//     console.log(resultData)
// })


//  callback challenge 

// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a,b,callback) => {
    setTimeout(()=>{
        const result = a + b
        callback(result)
    },2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})