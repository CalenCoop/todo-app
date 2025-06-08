const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    //INSERT INTO todo(id, desctiption) VALUES (description: description)
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    console.log(description);
    res.status(200).json({ message: "todo recieved", todo: newTodo.rows[0] });
    //going to have to respond with the todo
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_ids = $2",
      [description, id]
    );
    res.status(200).json({ message: "todo has been updated", todo: todo });
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("DELETE FROM todo WHERE todo_ids = ($1)", [
      id,
    ]);
    res.status(200).json({
      message: "todo has been deleted",
      post: post,
      description: post.description,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * from todo");
    res.status(200).json({ message: "fetched todos", todos: todos.rows });
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todos/:id/completed", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query(
      "UPDATE todo SET completed = NOT completed WHERE todo_ids = $1",
      [id]
    );
    res.status(200).json({ message: "todo updated", todo: todo });
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todos/:id/priority", async (req, res) => {
  const { priority } = req.body;
  const { id } = req.params;
  console.log(req.body);
  try {
    const todo = await pool.query(
      "UPDATE todo SET priority = $1 WHERE todo_ids = $2 RETURNING *",
      [priority, id]
    );
    res
      .status(200)
      .json({ message: "updated todos priority", todo: todo.rows });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(3001, () => {
  console.log("server has started on port 3001");
});
