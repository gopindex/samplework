const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// middleware for logging incoming requests
app.use(logger("dev"));
// middleware for parse JSON data
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening to port <${PORT}>`);
});

const Test = require("./model/Test");
app.get("/", async function (req, res) {
  const allTest = await Test.find({});
  res.status(200).send(allTest);
});
app.put("/", async function (req, res) {
  const name = req.body.name;
  const resp = await Test.findOneAndUpdate(
    { _id: "60d2a1362dab5d5933d8c2c6" },
    {
      $set: { testName: name },
    }
  );
  res.status(200).send(resp);
});
app.post("/", async function (req, res) {
  const { testName, testId, testDescription, testTags } = req.body;

  const test = new Test({ testName, testId, testDescription });
  test.testTags.push(testTags);
  const newTest = await test.save();
  res.status(201).send(newTest);
});

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("DB Connected");
      return;
    }
    console.log(err);
    process.exit(0);
  }
);
