import { type TodoType } from "../types/TodoType";
import { type Dispatch, type SetStateAction } from "react";

export async function useFetchTodos(
  setState: Dispatch<SetStateAction<TodoType[]>>
): Promise<void> {
  try {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    console.log("data", data);
    setState(data.todos);
  } catch (error) {
    console.log(error);
  }
}
