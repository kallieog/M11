const path = require("path")
const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const express = require("express")
const app = express()
const PORT = 3001
const { v4: uuidv4 } = require('uuid');

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static("public"))
app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

const getNotes=() => {
    return readFile("db.json", "utf-8").then(rawNotes => [].concat(JSON.parse(rawNotes)))
}

app.get("/api/notes", (req,res)=> {
    getNotes().then(notes => res.json(notes)).catch(err => res.json(err).status(500))
})

app.post("/api/notes", (req, res) => {
    getNotes().then(oldNotes => {
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: 
        }
        let newArray = [...oldNotes, newNote]
        writeFile("db.json", JSON.stringify(newArray)).then(() => res.json({msg: "Okay"}))
    })
})
app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id)
})



app.listen(PORT,() => {
    console.log("Server running on 3001")
})