const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const emailRouter = require("./routes/email");
app.use("/api", emailRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
