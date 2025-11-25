const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectToDatabase,
};
