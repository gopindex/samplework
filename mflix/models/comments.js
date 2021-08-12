const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  text: String,
  date: { type: Date, default: Date.now() },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.expors = Comment;
