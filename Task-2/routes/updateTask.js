const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id, title, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { taskid: id },
      { title: title, completed: completed },
      { new: true }
    );

    if (task) {
      res.status(200).send({ msg: "Task Updated Successfully" });
    } else {
      res.status(404).send({ msg: "Task Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
