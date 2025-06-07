import React from "react";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { type TodoType } from "../types/TodoType";
import { type Dispatch, type SetStateAction } from "react";

type TodoProps = {
  todo: TodoType;
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export default function Todo({ todo, setTodos }: TodoProps) {
  const [text, setText] = React.useState(todo.description);
  const [editTodo, setEditTodo] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(todo.completed);

  async function handleDelete(): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:3001/todos/${todo.todo_ids}`,
        { method: "DELETE", headers: { "Content-type": "application/json" } }
      );
      const data = await response.json();
      useFetchTodos(setTodos);
      console.log("delete successful", data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleEdit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/todos/${todo.todo_ids}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ description: text }),
        }
      );
      const data = await response.json();
      console.log("successfully edited post", data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleCompleted(): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:3001/todos/${todo.todo_ids}/completed`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
      useFetchTodos(setTodos);
    } catch (error) {
      console.log("error with marking completed", error);
    }
  }
  return (
    <div className="todo-container">
      {editTodo ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button> Update task</button>
        </form>
      ) : (
        <p>{todo.description}</p>
      )}
      <p>{todo.completed ? "true" : "false"}</p>
      <button onClick={handleDelete}> Delete Task</button>
      <button onClick={() => setEditTodo((todo) => !todo)}>Edit Task</button>
      <form onChange={handleCompleted}>
        <span> Task completed</span>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted((val) => !val)}
        />
      </form>
    </div>
  );
}
