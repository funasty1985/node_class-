// 39. ES6 Aside: Object Property Shorthand and Destruction

// Object property shorthand 

const name = 'Andrew'
const userAge = 27 

// const user = {
//     name: name,
//     age: userAge,
//     location: "Hong Kong"
// }

// shorthand 

// const user = {
//     name,
//     age: userAge,
//     location: "Hong Kong"
// }

// console.log(user)

// Object destructuring 

const product = {
    label: "Red notebook",
    price:3,
    stock:201,
    salePrice: 100
}

// const {label:productLabel, stock, salePrice = 200, rating, happy = true} = product

// console.log(productLabel)
// console.log(stock)
// console.log(salePrice)
// console.log(rating)  // undefined
// console.log(happy)

// function destructuring
const transaction = (type, { label, stock = 0 } = {} )=>{
    console.log(type, label, stock)
}

transaction('order', product)

