// 32 Customizing HTTP Requests , // 34. Handling Error 
// check out chrome extension chrome formatter.

// If error is populated , repsone will be undefine and vice verse.
// When there is a lost in connection (a loww level os error), error will be populated. 
// Sending a broken url to the service ,eg missing lag/long will not cause the error to populate as the server still sending the an error JSON back
// response.body.error is used to catch a high level error e.g missing lag/long where a error JSON is send from server

// const url = 'https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/37.8267,-122.4233'

// request({url:url, json:true},(error,response)=>{
//     if (error){
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error){
//         console.log('Usable to find location')
//     } 
//     else {
//         console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} % chance of rain.`)
//     }  
// })

// 37. Callback Abstraction Challenge

// const request = require('request')

// const forecast = (lag, long, callback) => {
//     const url = `https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/${lag},${long}`
//     request({url:url, json:true},(error,response) => {
//         if(error){
//             callback('not connection',undefined)
//         } else if (response.body.error) {
//             callback('Usable to find location', undefined)
//         } else {
//             callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} % chance of rain.` )
//         }
//     })
// }

// module.exports = forecast 

// with destruction

const request = require('request')

const forecast = (lag, long, callback) => {
    const url = `https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/${lag},${long}`
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('not connection',undefined)
        } else if (body.error) {
            callback('Usable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.` )
        }
    })
}

module.exports = forecast 