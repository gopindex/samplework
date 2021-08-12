const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");

// middleware

// parse JSON data
app.use(express.json());
// parse urlEncoded
app.use(express.urlencoded({ extended: false }));
// cors
app.use(cors());

const movieRoutes = require("./routes/movies");
app.use("/api/movie", movieRoutes);

app.listen(PORT, () => {
  console.log("Connected to PORT " + PORT);
});

// DB connection
dbConnect();
