// 33. An HTTP REquest Challenge 
// Geocoding service integration 
// Address -> Lat/Long -> Weather 
// check out the high level error on the browser by messing up geocodeURL and see the common error display in order to build up an if else statement
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGlhbmdmdXNraSIsImEiOiJjang5cmo3aWYwNHdxM3lwc2J1ZDZndWxxIn0.2M1L1tXcib2GI6e87jGdwQ'

// request({url:geocodeURL, json:true},(error, response)=>{
//     if (error) {
//         console.log('Usable to connect to location service !')
//     } else if (! response.body.features){
//         console.log('Usable to find location')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(longitude,latitude)
//     }
// })
// 36.Callback Abstraction, see 35 at playground/4-calbacks.js as well

const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGlhbmdmdXNraSIsImEiOiJjang5cmo3aWYwNHdxM3lwc2J1ZDZndWxxIn0.2M1L1tXcib2GI6e87jGdwQ`

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Usable to connect to location service !', undefined)
        } else if (body.features.length == 0) {
            callback('Usable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

