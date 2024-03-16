const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { taskid, title, completed } = req.body;

    const taskData = new Task({
      taskid: taskid,
      title: title,
      completed: completed,
    });

    await taskData.save();
    res.status(201).send({ msg: "Task added successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
