import express, { Request, Response } from "express";
import path from "node:path";
import { DataService } from "./data.service";
import { Note } from "./note.model";
import { v4 as uuid } from "uuid";

const PORT = 3000;
const NOTES_PATH = path.join(__dirname, "data", "db.json");

console.log(NOTES_PATH);

const app = express();

app.use(express.json());

//1. Get all notes
app.get("/notes", async (req: Request, res: Response) => {
  try {
    const notes = await DataService.readJSONFile<Note[]>(NOTES_PATH);

    res.json(notes);
  } catch (error) {
    res.status(500).json({ msg: "Couldn't fetch notes" });
  }
});
//2. Create a note
app.post("/notes", async (req: Request, res: Response) => {
  try {
    // Create a new note object
    const { title, body } = req.body as {
      title: string;
      body: string;
    };

    const newNote: Note = {
      id: uuid(),
      title,
      body,
    };
    // Read the notes
    const notes = await DataService.readJSONFile<Note[]>(NOTES_PATH);
    // Update the notes
    notes.push(newNote);
    // Save the notes
    await DataService.saveJSONFile<Note[]>(NOTES_PATH, notes);
    //Return created note
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: error });
  }
});

//3. Get note by id
app.get(
  "/notes/:id",
  async (req: Request<{ id: string }>, res: Response<Note | { msg: any }>) => {
    try {
      const noteId = req.params.id;

      console.log(noteId);

      //Read notes
      const notes = await DataService.readJSONFile<Note[]>(NOTES_PATH);
      //Try to find note in notes
      const foundNote = notes.find(note => note.id === noteId);

      if (!foundNote) throw new Error("Note Not Found");

      //Return note
      res.json(foundNote);
    } catch (error) {
      console.log(error);

      res.status(404).json({ msg: error });
    }
  }
);
//4. Update note
app.put("/notes/:id", async (req: Request, res: Response) => {
  try {
    //extract id and body
    const noteId = req.params.id;
    const updateData = req.body;
    //read notes
    const notes = await DataService.readJSONFile<Note[]>(NOTES_PATH);
    //find note by id
    const foundNote = notes.find(note => note.id === noteId);
    if (!foundNote) throw new Error("Note Not Found");
    //update notes
    const updatedNote: Note = {
      id: foundNote.id,
      title: updateData.title,
      body: updateData.body,
    };
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    //save notes
    await DataService.saveJSONFile<Note[]>(NOTES_PATH, updatedNotes);
    //return updated note
    res.json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
});
//5. Delete all note
app.delete("/notes/all", async (req, res) => {
  try {
    await DataService.saveJSONFile(NOTES_PATH, []);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});
// 6. Delete note
app.delete(
  "/notes/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      // extract id
      const noteId = req.params.id;
      // read notes
      const notes = await DataService.readJSONFile<Note[]>(NOTES_PATH);

      // delete note
      const updatedNotes = notes.filter(note => note.id !== noteId);

      if (updatedNotes.length === notes.length) throw new Error();

      // save notes
      await DataService.saveJSONFile<Note[]>(NOTES_PATH, updatedNotes);

      // return success response

      // res.sendStatus(200);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ msg: "Note not found" });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the notes api");
});

app.all("*", (req, res) => {
  res.status(404).send("ERROR 404! Requested content does not exist!");
});

app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});
