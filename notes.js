const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    const notes=loadNotes()
    const duplicateNotes=notes.find((note)=> note.title===title)

    if(!duplicateNotes){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('The note <'+title+'> added successfully...'))
    }else{
        console.log(chalk.red('The note <'+title+'> already exists!!!'))
    }
}

const saveNotes=(notes)=>{
    const dataJson=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataString=dataBuffer.toString()
        const data=JSON.parse(dataString)
        return data
    }catch(e){
        return []
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    const toKeep=notes.filter((note)=>note.title!==title)
    if(notes.length===toKeep.length){
        console.log(chalk.red('The note <'+title+'> does not exists!!!'))
    }else{
        saveNotes(toKeep)
        console.log(chalk.bgGreen('The note <'+title+'> removed successfully...'))
    }
}

const listNotes=()=>{
    const notes=loadNotes()
    if(notes.length===0){
        console.log(chalk.red('No notes availabe!!!'))
    }else{
        console.log(chalk.black.bgGrey('Your notes'))
        notes.forEach(note => {
            console.log(chalk.blue(note.title))
        });
    }
}

const readNote=(title)=>{
    const notes=loadNotes()
    const findNote=notes.find((note)=>note.title===title)
    if(findNote){
        console.log(chalk.black.bgGrey(findNote.title))
        console.log(chalk.gray(findNote.body))
    }else{
        console.log(chalk.red('Note not found!!!'))
    }
}

module.exports={
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}