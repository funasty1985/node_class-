// Part 4 File System and Command Line Args (Notes App)

//15 Getting inout from Users

// console.log(process.argv)
// console.log(process.argv[2])

// const command = process.argv[2]

// if (command === 'add'){
//     console.log('Adding note!')
// } else if (command === 'remove'){
//     console.log('Removing note!')
// }

// 16,17,18,19

const yargs = require("yargs")
const notes = require("./notesPart4")
// process.argv vs yargs.argv

// console.log(process.argv)
// console.log(yargs.argv)

// Customize yargs version 
yargs.version("1.1.0")

// Create add command 

yargs.command({
    command: "add",
    describe: "Add a new note", 
    builder:{
        title:{
            describe: "Note title",
            demandOption:true,  // Default is false
            type:"string"
        },
        body:{
            describe:"Note Body",
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command 
yargs.command({
    command:"remove",
    describe:"Reomve a note",
    builder:{
        title:{
            describe: "Specify the title of the object which are going to be removed",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command:"list",
    describe:"list all the note",
    handler() {
        notes.listNotes()
    }
})

// Create read command 
yargs.command({
    command:"read",
    describe:"read a note",
    builder:{
        title:{
            describe: 'Specific the title of the note to read',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


yargs.parse()