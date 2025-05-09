const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("<h1>To-Do API is running!</h1>");
});

app.post("/addTask", (req, res) => {
  const { taskName } = req.body;
  if (!taskName || typeof taskName !== "string" || taskName.trim() === "") {
    return res
      .status(400)
      .json({ error: "Task name is required and must be a non-empty string." });
  }
  const newTask = { id: nextId++, taskName: taskName.trim() };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }
  const deleted = tasks.splice(index, 1)[0];
  res.json({ success: true, deleted });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
