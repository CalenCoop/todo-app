import React from "react";
import { type TodoType } from "../types/TodoType";
import { type Dispatch, type SetStateAction } from "react";
import { useFetchTodos } from "../hooks/useFetchTodos";

type PostResponse = {
  message: string;
  todo: TodoType;
};
type PostFormProps = {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

export default function PostForm({ setTodos }: PostFormProps) {
  const [text, setText] = React.useState("");

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ description: text }),
      });
      const data: PostResponse = await response.json();
      useFetchTodos(setTodos);
      console.log("data", data);
      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Set Task</button>
    </form>
  );
}
