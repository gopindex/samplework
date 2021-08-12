const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  testName: {
    type: String,
    required: true,
  },
  testId: {
    type: Number,
    max: 200000,
  },
  testDescription: {
    type: String,
    default: "This is a test Description",
  },
  testTags: {
    type: Array,
  },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
