const fs = require('fs')
const chalk = require('chalk')

const addNote = (title,body)=> {
    const notes = loadNotes()
    // const duplicateNotes = notes.some( note => note.title === title)

    // stop the iteration once a match is find. 
    const duplicateNote = notes.find( note => note.title === title)
    
    debugger

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log("Note title taken!")
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note=>note.title != title)
    if (newNotes.length === notes.length){
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.green.inverse('Note removed'))
    }

}

const readNote = (title) => {
    const notes = loadNotes()
    const targetNote = notes.find(note=> note.title === title)
    if(targetNote){
        console.log(chalk.green.bold(targetNote.title))
        console.log(targetNote.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
    
}

const listNotes = () => {
    console.log(chalk.bold.green('Your Notes'))
    const notes = loadNotes()
    
    notes.forEach((note)=>
        console.log(note.title)
    )
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notesPart4.json', dataJSON)
}

const loadNotes = ()=> {
    try{
        const dataBuffer = fs.readFileSync('notesPart4.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}