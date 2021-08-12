const express = require("express");
const router = express.Router();
const { validateNote, validateNoteCard } = require("../config/validators");
const NoteController = require("../controller/notes");
// note && noteCard
router.get("/", NoteController.getAllNotes);

router.post("/", validateNote, NoteController.postNote);
router.post("/:noteId", validateNoteCard, NoteController.postNoteCard);
router.delete("/:noteId", NoteController.deleteNote);

// noteCard
router.delete("/card/:noteCardId", NoteController.deleteNoteCard);
router.put("/card/:noteCardId", NoteController.updateNoteCard);

module.exports = router;
