const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userAuth = await User.findOne({ email: username });

    if (userAuth) {
      const comparePassword = await bcrypt.compare(password, userAuth.password);
      if (comparePassword) {
        res.status(200).json({ msg: "User Logged in successfully." });
      } else {
        res.status(401).json({ msg: "Username / Password is incorrect." });
      }
    } else {
      res.status(401).json({ msg: "Username / Password is incorrect." });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
