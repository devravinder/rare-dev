import TodoItem from "./TodoItem";
import { fetchTodosAction } from "@/actions/todoActions";
export const fetchCache = 'force-no-store';

const TodoList = async () => {
  const todos = await fetchTodosAction();
  return <>
    <div className="flex flex-col gap-4 w-full">
      {
        todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
      }
      {todos.length == 0 && <div className="flex flex-row justify-center items-center">No Todos</div>}

    </div>
  </>
}

export default TodoList;