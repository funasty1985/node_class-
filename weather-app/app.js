// Part6 Asynchronous Node.js
// 29. Asynchronous Basic 

// console.log('Starting')

// seetTimeout is an asynchronous function from nodejs
// setTimeout is not a default function in V-8 engine, 
// it will push a timer function to the Node APIs and itself leave the Call Stack
// The rest of the code will run and the following function will go to Call Stack
// console.log('2 Second Timer') will eventually push to Event Loop and will then 
// push to Call Stack when the Stack is empty and it will eventually be executed. 
// setTimeout(()=> {
//     console.log('2 Second Timer')
// },2000)

// This setTimeout runs after console.log('Stopping') even thoough the timer set to 0 second.
// Although console.log('0 Second Timer') is pushed to the Event Loop , Call Stack is still 
// occupied by console.log('Finishing up') and main(). 
// console.log('0 Second Timer') will only be push to call stack when the two functions are 
// executed and leave the call stack empty.
// setTimeout(()=> {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')

// 31 Making HTTP Requests

// const request = require('request')

// const url = 'https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/37.8267,-122.4233'

// request({url:url},(error,response)=>{
//     const data = JSON.parse(response.body)
//     console.log(data.currently)
// })
 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// 38. Callback chainning 

// when geocode and forecast are separated 

// geocode('Hong Kong',(error, data)=>{
//     console.log('Error', error)
//     console.log('Data',data)
// })

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

// when geocode and forcast are chained 
// note that the error argument in the callback functions of geocode 
// and forcast are different from the error arugment of request function 
// the former include both high level and low level connection error 
// that we define ourselves,
// the later include only the low level error that is defined by request build in 

// the second argument of the callbacks of geocode and forecast should have 
// a different name, otherwise, only forcast result is accessible at the end

const address = process.argv[2]

// without destruction

// if (!address) {
//     console.log('Please provide an address')
// } else {
//     geocode(address, (error, data)=>{
//     if (error) {
//         return console.log(error)
//     }

//     forecast(data.latitude, data.longitude, (error, forecastData) => {
//         if (error) {
//             return console.log(error)
//         }
        
//         console.log(data.location)
//         console.log(forecastData)
//      })
// })
// }

// with destruction

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, {latitude, longitude, location} )=>{
        if (error) {
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            console.log(location)
            console.log(forecastData)
         })
    })
}


