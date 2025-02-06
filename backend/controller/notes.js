import Note from "../model/notes.js";

// Get all notes
async function handleAllNotes(req, res) {
  try {
    const ALLNOTES = await Note.find({ generatedBy: req.user.id });
    if (!ALLNOTES)
      return res
        .status(404)
        .json({ message: "Error Fetching Notes, 404 Not Found" });
    return res.status(200).json(ALLNOTES);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Fetching Notes" });
  }
}

// Create a new note
async function handleCreateNote(req, res) {
  try {
    const { title, text, tags } = req.body;
    const createdNote = await Note.create({
      title,
      text,
      tags,
      generatedBy: req.user.id,
    });
    if (!createdNote)
      return res.status(400).json({ message: "failed to create note" });
    return res.status(201).json(createdNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Creating Note" });
  }
}

// Edit an existing note
async function handleEditNote(req, res) {
  try {
    const { title, text, tags, id } = req.body;
    const editedNote = await Note.findByIdAndUpdate(
      { _id: id },
      {
        title,
        text,
        tags,
      },
      { new: true }
    );
    if (!editedNote)
      return res.status(400).json({ message: "failed to edit note" });
    return res.status(201).json(editedNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Editing Note" });
  }
}

// Delete a note
async function handleDeleteNote(req, res) {
  try {
    const noteToDelete = req.params.id;
    const deletedNote = await Note.findOneAndDelete({ _id: noteToDelete });
    if (!deletedNote)
      return res.status(400).json({ message: "failed to delete note" });
    return res.status(201).json(deletedNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Deleting Note" });
  }
}

export { handleAllNotes, handleCreateNote, handleDeleteNote, handleEditNote };
