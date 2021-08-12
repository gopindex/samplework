const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  plot: {
    type: String,
    trim: true,
  },
  genres: {
    type: [String],
  },
  runtime: {
    type: Number,
    max: 2000,
    min: 1,
  },
  num_mflix_comments: {
    type: Number,
    min: 1,
  },
  title: {
    type: String,
    trim: true,
  },
  fullPlot: {
    type: String,
    trim: true,
  },
  countries: {
    type: [String],
  },

  released: {
    type: Date,
  },
  directors: {
    type: [String],
  },
  rated: String,
  awards: {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  lastupdated: {
    type: Date,
    default: Date.now(),
  },
  year: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear(),
  },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    lastUpdated: { type: Date, default: Date.now() },
  },
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
