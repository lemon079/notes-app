import {
  handleAllNotes,
  handleCreateNote,
  handleDeleteNote,
  handleEditNote,
} from "../controller/notes.js";

import express from "express";
const router = express.Router();

// get all notes
router.get("/", handleAllNotes);
// create a note
router.post("/", handleCreateNote);
// edit a note
router.patch("/:id", handleEditNote);
// delete a note
router.delete("/:id", handleDeleteNote);


export default router;
