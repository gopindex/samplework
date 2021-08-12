const mongoose = require("mongoose");
const keys = require("./keys");

/**
 * @description Database Connection
 * @author Pranish
 * @function
 */
async function dbConnect() {
  try {
    await mongoose.connect(keys.mongoURI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (err) {
    console.log("DB failed to Connect");
  }
}

module.exports = dbConnect;
