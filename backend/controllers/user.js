const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });
      if (user)
        return res.status(400).json({ message: "The username already exists" });
      if (username.length < 8)
        return res.status(400).json({ message: "Username is at the 8 char" });
      if (password.length < 8)
        return res.status(400).json({ message: "Password is at the 8 char" });
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await Users({ username, password: passwordHash });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN, {
        expiresIn: "1d",
      });
      res.json({ user: newUser, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username }).select(
        "password username"
      );
      if (username.length < 8)
        return res.status(400).json({ message: "Username is at the 8 char" });
      if (password.length < 8)
        return res.status(400).json({ message: "Password is at the 8 char" });
      if (!user)
        return res.status(400).json({ message: "User does not exists" });
      const isWatch = await bcrypt.compare(password, user.password);
      if (!isWatch)
        return res.status(400).json({ message: "incorrect password" });
      const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
        expiresIn: "1d",
      });
      res.json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user._id).select("-password");
      if (!user)
        return res.status(400).json({ message: "User does not exists" });
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = user;
