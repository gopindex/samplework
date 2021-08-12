const { check } = require("express-validator");

const validateNote = [
  check("title").isString().withMessage("Title should be string"),
];

const validateNoteCard = [
  check("note").isString().withMessage("Note should be a string"),
  check("completed")
    .isBoolean()
    .withMessage("Completed should be a boolean")
    .optional(),
];

module.exports = { validateNote, validateNoteCard };
