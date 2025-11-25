const mongoose = require("mongoose");

// Auth
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
