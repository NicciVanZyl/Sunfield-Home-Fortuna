//Things that don't need auth go here
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res, next) => {
  try {
    res.json(await User.getAll());
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // A user may edit themselves; admins may edit anyone
    if (req.user.id !== id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You can only update your own account" });
    }
    const { firstName, lastName, email, password, location, number } = req.body;
    if (!firstName || !lastName || !email || !password || !location || !number)
      return res.status(400).json({ error: "All fields are required" });
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const updated = await User.update(id, {
      firstName,
      lastName,
      email,
      passwordHash,
      location,
      number,
    });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
