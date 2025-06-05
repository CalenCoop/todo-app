import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import PostForm from "./components/PostForm";
import { type TodoType } from "./types/TodoType";
import { useFetchTodos } from "./hooks/useFetchTodos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    useFetchTodos(setTodos);
  }, []);

  const todosElements = todos.map((todo) => (
    <Todo key={todo.todo_ids} todo={todo} setTodos={setTodos} />
  ));

  return (
    <>
      <div>
        <h1>Todo-List</h1>
        <PostForm setTodos={setTodos} />
        {todosElements}
      </div>
    </>
  );
}

export default App;
