const Movie = require("../models/movies");
module.exports = {
  async getAllMovie(req, res) {
    try {
      const movies = await Movie.find({}).limit(20);
      res.status(200).send(movies);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async postMovie(req, res) {
    try {
      if (!req.body.title) {
        return res.status(400).send("Title must be provided");
      }
      const mymovie = new Movie({ ...req.body });
      let movie = await mymovie.save();
      res.status(201).send(movie);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteMovieById(req, res) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).send("Successfully Deleted a Movie");
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async updateMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
          },
        },
        { $new: true }
      );

      res.status(200).send(movie);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
