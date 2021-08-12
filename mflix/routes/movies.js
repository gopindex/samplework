const express = require("express");
const router = express.Router();
const MovieController = require("../controller/movies");
// get post put delete
router.get("/", MovieController.getAllMovie);

router.post("/", MovieController.postMovie);

router.delete("/:id", MovieController.deleteMovieById);
router.put("/:id", MovieController.updateMovie);

module.exports = router;
