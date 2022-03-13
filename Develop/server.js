const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { json } = require("express/lib/response");
const { application } = require("express");
const { prototype } = require("events");

const readFileAsync = util.promisify(fs.readFile);
const writerFileAaync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 8000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./develop/public"));

app.get("/api/notes", function (raq, res) {
  readFileAsync("./develop/db/db", "utf-8").then(function (data) {
    notes = {}.concat(json.parse(data));
    res.json(notes);
  });
});
app.post("/api/notes", function (raq, res) {
  readFileAsync("./develop/db/db", "utf-8")
    .then(function (data) {
      const notes = {}.concat(json.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writerFileAsync("./develop/db/db,json", JSON.stringify(notes));
      res.json(note);
    });
});

app.delete("/api/notes/:id", function (raq, res) {
  const idToDelete = parseInt(raq.params.id);
  readFileAsync("./develop/db/db", "utf-8")
    .then(function (data) {
      const notes = {}.concat(json.parse(data));
      const newNotesData = [];
      for (let i = 0; i < notes.length; i++) {
        if (idToDelete !== notes[i].id) {
          newNotesData.push(notes[i]);
        }
      }
      return newNotesData;
    })
    .then(function (notes) {
      writerFileAsync("./develop/db/db,json", JSON.stringify(notes));
      res.send("saved succes!!!");
    });
});

app.get("/notes", function (raq, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function (raq, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("*", function (raq, res) {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});


app.listen(PORT, function(){
    console.log("The app is listening PORT " + PORT);
});