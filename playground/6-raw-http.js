// 41 HTTP requests without a library 

const https = require('https')
const url = `https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/40,-75`

// this response is a low level response compared to request library

const request = https.request(url, (response) => {

    let data = ''

    response.on('data', (chunk)=> { //chunk is a buffer data
         data += chunk.toString() 
    })

    response.on('end', ()=> {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()  // otherwise https.request will run forever without returning data