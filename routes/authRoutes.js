const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { User } = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");

dotenv.config();

const router = express.Router();

// /auth/login
router.post("/login", async (request, response) => {
  try {
    // email
    const email = request.body.email;
    // email exist
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "Invalid Credentails" });
    }
    // password
    const password = request.body.password;
    // compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).json({ message: "Invalid Credentails" });
    }
    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // return
    response.json({
      message: "User LoggedIn Successfully!",
      data: {
        token,
        email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error!" });
  }
});
// /auth/register
router.post("/register", async (request, response) => {
  try {
    // body
    // const email = request.body.email;
    // const password = request.body.password;
    // const role = request.body.role;
    const { email, password, role } = request.body;
    // email => exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: "User Already Exist!" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    // create user db
    const user = await User.create({ email, password: hashedPassword, role });
    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // return
    response.status(201).json({
      message: "User Created Successfully!",
      data: {
        token,
        email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/me", authMiddleware, async (request, response) => {
  const id = request.user.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json({ message: "User Not Found!" });
    }
    response.json({ message: "User Still Logged In", data: user });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
