import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import AddTask from "./components/AddTask";
import axios from "axios";
import TaskContainer from "./components/TaskContainer";
import Signup from "./components/Signup";
import Login from "./components/Login";

// const demoTasks = [
//   {
//     id: 1,
//     taskName: "First Task",
//     status: "completed",
//   },

//   {
//     id: 2,
//     taskName: "Second Task",
//     status: "completed",
//   },

//   {
//     id: 3,
//     taskName: "Third Task",
//     status: "completed",
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  // const [completedTask, setCompletedTask] = useState(demoTasks);

  const getApiData = async () => {
    const response = await axios.get("/gettasks");

    setTasks(response.data.tasks);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleAddClick = async (task) => {
    const id = uuidv4();

    const taskData = {
      taskid: id,
      title: task,
      completed: false,
    };

    const response = await axios.post("/addtask", taskData);

    if (response.status == 201) {
      setTasks([
        ...tasks,
        {
          taskid: id,
          title: task,
          completed: false,
        },
      ]);
    }
  };

  const handleDone = async (id) => {
    console.log(id);
    const response = await axios.post("/updatetask", { id, completed: true });

    if (response.status == 200) {
      const data = tasks.map((task) => {
        if (task.taskid == id) {
          return { ...task, completed: true };
        }
        return task;
      });
      setTasks(data);
    }
  };

  const handleUndo = async (id) => {
    const response = await axios.post("/updatetask", { id, completed: false });

    if (response.status == 200) {
      const data = tasks.map((task) => {
        if (task.taskid == id) {
          return { ...task, completed: false };
        }
        return task;
      });
      setTasks(data);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.post(`/deletetask/${id}`);

    if (response.status == 200) {
      const data = tasks.filter((task) => task.taskid !== id);
      setTasks(data);
    }
  };

  const handleSave = async (value, id) => {
    const response = await axios.post("/updatetask", { id, title: value });

    if (response.status == 200) {
      const data = tasks.map((task) => {
        if (task.taskid == id) {
          return { ...task, title: value };
        }
        return task;
      });
      setTasks(data);
    }
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <AddTask handleClick={handleAddClick} />
      <TaskContainer
        taskList={tasks.filter((task) => !task.completed)}
        pendingStatus={true}
        doneTask={handleDone}
        saveTask={handleSave}
      />
      <TaskContainer
        taskList={tasks.filter((task) => task.completed)}
        undoTask={handleUndo}
        deleteTask={handleDelete}
      />

      {/* <Signup />
      <Login /> */}
    </div>
  );
};

export default App;
