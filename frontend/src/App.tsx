import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import PostForm from "./components/PostForm";
import { type TodoType } from "./types/TodoType";
import { useFetchTodos } from "./hooks/useFetchTodos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [sortByPriority, setSortByPriority] = useState(true);

  useEffect(() => {
    useFetchTodos(setTodos);
  }, []);

  function handleSort() {
    if (sortByPriority) {
      return [...todos].sort(
        (a: TodoType, b: TodoType) => b.priority - a.priority
      );
    }
    return todos;
  }
  const sortedTodos = handleSort();
  console.log("sorted", sortedTodos);

  const todosElements = sortedTodos.map((todo) => (
    <Todo key={todo.todo_ids} todo={todo} setTodos={setTodos} />
  ));

  return (
    <>
      <div>
        <h1>Todo-List</h1>
        <PostForm setTodos={setTodos} />
        <div className="todo-cols">
          <div className="todo-task-desc">
            <span>Task</span>
          </div>
          <div className="todo-task-cols">
            <span>Completed</span>
            <span>Task</span>
            <span>Task</span>
            <span>Mark Completed</span>
            <span onClick={() => setSortByPriority((val) => !val)}>
              Priority
            </span>
          </div>
        </div>
        {todosElements}
      </div>
    </>
  );
}

export default App;
