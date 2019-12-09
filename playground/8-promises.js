// Compare this to 4.1-callbacks.js

// nornmally coder doesn't create promise object himself. 
// It is created by liraraies eg mongodb 
// Here we create one only for illustration
// For a promise object, only either one of resolve() or reject() will be called.
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([7,4,1])
        reject('Things went wrong')
    },2000)
})

// the callback at .then() runs when the Promise Object above fulfilled (calling the resolve func) 
// and the arg of resolve() become the result arguement at the callback of .then
// If the Promise object above called reject() (the pending is rejected), .catch() will catch the reject arg as its own arg 'error'
doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error)=>{
    console.log('Error', error)
})