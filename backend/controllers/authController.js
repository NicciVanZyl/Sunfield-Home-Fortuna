//things that require Bcrypt and JWT go in the auth controller
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (user) =>
  jwt.sign({ id: user.userID, role: user.userRole }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "3h",
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    if (await User.findByEmail(email)) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    // Role is always 'user' on self-registration; never trust a role sent by the client.
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findByEmail(email);
    // Same message for both failures so attackers can't discover which emails exist
    if (!user || !(await bcrypt.compare(password, user.userPassword))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const { PasswordHash, ...safeUser } = user;
    res.json({ token: signToken(user), user: safeUser });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
