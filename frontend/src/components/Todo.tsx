import { useFetchTodos } from "../hooks/useFetchTodos";
import { type TodoType } from "../types/TodoType";
import { type Dispatch, type SetStateAction } from "react";

type TodoProps = {
  todo: TodoType;
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export default function Todo({ todo, setTodos }: TodoProps) {
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
  return (
    <div className="todo-container">
      <p>{todo.description}</p>
      <p>{todo.completed ? "true" : "false"}</p>
      <button onClick={handleDelete}> Delete Task</button>
    </div>
  );
}
