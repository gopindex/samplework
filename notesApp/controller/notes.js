const Note = require("../models/note");
const NoteCard = require("../models/noteCard");
const { validationResult } = require("express-validator");

module.exports = {
  async getAllNotes(req, res) {
    try {
      const allNotes = await Note.find({}).populate("noteCards").exec();
      res.status(200).json(allNotes);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },

  async postNote(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((el) => el.msg) });
      }
      const { title } = req.body;
      const note = new Note({ title });
      const newNote = await note.save();
      res.status(200).send(newNote);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async postNoteCard(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((el) => el.msg) });
      }
      const { noteId } = req.params;
      const { note, completed } = req.body;
      //   crete a note card
      const noteCard = new NoteCard({
        note: note,
        completed: completed || false,
      });
      //save it
      const newNoteCard = await noteCard.save();
      //   find the note you want to add notecard on
      let existingNote = await Note.findOne({ _id: noteId });

      //   push ObjectId to the noteCard
      existingNote.noteCards.push(newNoteCard._id);
      existingNote = await existingNote.save();

      let mynote = await Note.findOne({ _id: noteId })
        .populate("noteCards")
        .exec();
      res.status(201).send(mynote);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },

  async deleteNote(req, res) {
    try {
      const { noteId } = req.params;
      const note = await Note.findOne({ _id: noteId });
      // if note doesn't exist, send a resp immediately
      if (!note) {
        return res.status(200).send("Note doesn't exist");
      }
      // delete noteCard from noteCard collection which existed on note
      note.noteCards.forEach(async (id) => {
        await NoteCard.findByIdAndDelete(id);
      });
      // finally delete the note Itself
      await Note.findByIdAndDelete(noteId);
      res.status(200).send(`Note ${noteId} has been deleted`);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteNoteCard(req, res) {
    try {
      const { noteCardId } = req.params;
      await NoteCard.findByIdAndDelete(noteCardId);
      const note = await Note.findOneAndUpdate(
        { noteCards: noteCardId },
        {
          $pull: { noteCards: noteCardId },
        },
        {
          new: true,
        }
      );
      res.status(200).send(note);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async updateNoteCard(req, res) {
    try {
      // const { note, completed } = req.body;
      const { noteCardId } = req.params;
      const noteCard = await NoteCard.findOneAndUpdate(
        {
          _id: noteCardId,
        },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(noteCard);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
