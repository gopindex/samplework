require("dotenv").config();

if (process.env.NODE_ENV === "DEV") {
  module.exports = {
    mongoURI: process.env.MONGO_DEV_URI,
  };
} else if (process.env.NODE_ENV === "PRODUCTION") {
  module.exports = { mongoURI: process.env.MONGO_URI };
}
