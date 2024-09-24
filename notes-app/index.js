import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import { DataService } from "./data.service.js";
import { v4 as uuid } from "uuid";

// This is how it's done right now, simply copy if you want to use
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NOTES_PATH = path.join(__dirname, "data", "db.json");
const PORT = 3000;

const app = express();

// Allows expres to parse json in request body
app.use(express.json());

//1. Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await DataService.readJSONFile(NOTES_PATH);

    return res.json(notes);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Couldn't fetch notes" });
  }
});

//2. Create a note
app.post("/notes", async (req, res) => {
  try {
    // Create a new note object
    const { title, body } = req.body;

    const newNote = {
      id: uuid(),
      title,
      body,
    };
    // Read the notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    // Update the notes
    notes.push(newNote);
    // Save the notes
    await DataService.saveJSONFile(NOTES_PATH, notes);
    //Return created note
    return res.status(201).json(newNote);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ msg: error });
  }
});

//3. Get note by id
app.get("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    console.log(noteId);

    //Read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    //Try to find note in notes
    const foundNote = notes.find(note => note.id === noteId);

    if (!foundNote) throw new Error("Note Not Found");

    //Return note
    return res.json(foundNote);
  } catch (error) {
    console.log(error);

    return res.status(404).json({ msg: error.message });
  }
});

//4. Update note
app.put("/notes/:id", async (req, res) => {
  try {
    //extract id and body
    const noteId = req.params.id;
    const updateData = req.body;
    //read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    //find note by id
    const foundNote = notes.find(note => note.id === noteId);
    if (!foundNote) throw new Error("Note Not Found");
    //update notes
    const updatedNote = {
      id: foundNote.id,
      title: updateData.title,
      body: updateData.body,
    };
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    //save notes
    await DataService.saveJSONFile(NOTES_PATH, updatedNotes);
    //return updated note
    return res.json(updatedNote);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message });
  }
});
//5. Delete all note
app.delete("/notes/all", async (req, res) => {
  try {
    await DataService.saveJSONFile(NOTES_PATH, []);

    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
});
//6. Delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    //read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    //delete note
    const updatedNotes = notes.filter(note => note.id !== noteId);

    if (notes.length === updatedNotes.length) throw new Error("Note Not Found");

    //save notes
    await DataService.saveJSONFile(NOTES_PATH, updatedNotes);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

app.get("/", (req, res) => {
  return res.send("Welcome to the notes api");
});

app.all("*", (req, res) => {
  res.status(404).send("ERROR 404! Requested content does not exist!");
});

app.listen(PORT, () => {
  console.log("Server is up at port 3000");
});
