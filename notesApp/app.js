const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dbConnect = require("./config/db");

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "DEV";
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (NODE_ENV === "DEV") {
  app.use(logger("dev"));
}
//routes

const noteRoutes = require("./routes/notes");
app.use("/api/notes", noteRoutes);

// Server Connection
app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

// DB Connection
dbConnect();
