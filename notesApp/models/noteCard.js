const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteCardSchema = new Schema(
  {
    note: {
      type: String,
      minLength: 1,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const NoteCard = mongoose.model("NoteCard", noteCardSchema);
module.exports = NoteCard;
