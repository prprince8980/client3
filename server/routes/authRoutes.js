const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//////////////////////////////////////////////////////
// 📱 MOBILE SIGNUP
//////////////////////////////////////////////////////

router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, confirmPassword } = req.body;

    // check fields
    if (!name || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check existing user
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "Mobile already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
      authType: "mobile",
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////////
// 🔐 MOBILE LOGIN
//////////////////////////////////////////////////////

router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone & password required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Use Google login for this account",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////////
// 🌐 GOOGLE LOGIN
//////////////////////////////////////////////////////

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name } = payload;

    // check existing
    let user = await User.findOne({
      $or: [{ googleId: sub }, { email }],
    });

    if (user) {
      const appToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        message: "Login successful",
        popup: "Account already exists",
        token: appToken,
        user,
      });
    }

    // create new user
    user = new User({
      name,
      email,
      googleId: sub,
      authType: "google",
    });

    await user.save();

    const appToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google signup successful",
      token: appToken,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Google auth failed" });
  }
});

//////////////////////////////////////////////////////

module.exports = router;