// Part3 Node.js Module System (Notes App)
// 9. Importing Node.js Module System

// const fs = require('fs')

// fs.writeFileSync('notes.txt','This file was created by Node.js')

// fs.appendFileSync('notes.txt','\nThis is the second line.')

// 10. Importing Your Own Files

// assign the add func exporting from utils.js to a variable add here.
// const add = require('./utils.js')

// const sum = add(4,-2)

// console.log(sum)

// Challenge 
// const func = require('./notes');

// console.log(func())

// 11. Importing npm Modules 
// for importing npm modules, we just need its name as the arguement of require
// The same as import validator from 'validator' in ES6
// const validator = require("validator")

// console.log(validator.isEmail("tony.f.liang@gmail.com"))

// console.log(validator.isURL("https://mead.io"))

// 12. Printing in Color

// const chalk = require("chalk")
// console.log(chalk.red.bold("Fail"))
