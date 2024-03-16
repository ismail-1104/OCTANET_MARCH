const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const userAuth = await User.findOne({ email: username });

    if (!userAuth) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = new User({
        email: username,
        password: hashedPassword,
        name: name,
      });

      await userData.save();
      res.status(201).json({ msg: "User signed up successfully." });
    } else {
      res.status(409).json({ msg: "User already exists." });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
