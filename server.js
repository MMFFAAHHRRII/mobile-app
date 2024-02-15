const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Placeholder database (in-memory array)
let notes = [
  { id: 1, title: "Note 1", description: "Description for Note 1" },
  { id: 2, title: "Note 2", description: "Description for Note 2" },
];

// Route to fetch all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Route to create a new note
app.post("/notes", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    description,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Route to update a note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = notes.findIndex((note) => note.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[index] = { ...notes[index], title, description };
  res.json(notes[index]);
});

// Route to delete a note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes.splice(index, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
