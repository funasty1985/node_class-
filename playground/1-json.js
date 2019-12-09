// 18.Stroing Data with JSON 
const fs = require('fs')

// const book = {
//     title:'Ego is the Enemy',
//     author:'Ryan Holiday'
// }

// JSON is a string but not an object
// JSON.strigify is a built in method in javascript
// const bookJSON = JSON.stringify(book)

// bookJSON.title is undefined
// console.log(bookJSON)

// convert a JSON back to an oject
// const parseData = JSON.parse(bookJSON)
// console.log(parseData.title)




// writing bookJSON to another file
// fs.writeFileSync('1-json.json',bookJSON)

// read in 1-json,json 
// const dataBuffer = fs.readFileSync('1-json.json')  // return bit data
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

// Challenge url= links.mead.io/json-sample
// const dataBuffer = fs.readFileSync('1-jsonChallenge.json')
// const dataJSON = dataBuffer.toString() // JSON is a string
// const user = JSON.parse(dataJSON)  // change a JSON to an object

// user.name = "Liang Fu"

// const changedJSON = JSON.stringify(data)
// fs.writeFileSync('1-jsonChallenge.json',changedJSON)