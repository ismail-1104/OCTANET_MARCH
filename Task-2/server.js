const express = require("express");
const connectDatabase = require("./config/db");

const port = 5000;
const app = express();
connectDatabase();
app.use(express.json());

app.use("/gettasks", require("./routes/getTasks"));
app.use("/addtask", require("./routes/addTask"));
app.use("/updatetask", require("./routes/updateTask"));
app.use("/deletetask", require("./routes/deleteTask"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

app.listen(port, () => {
  console.log("Server is running successfully");
});
