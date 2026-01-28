import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex mb-4">
      <input
        type="text"
        placeholder="Write Todo..."
        className="
          w-full px-3 py-2 rounded-l-lg outline-none
          border border-black/10 dark:border-white/20
          bg-white dark:bg-slate-700
          text-black dark:text-white
          placeholder:text-gray-500 dark:placeholder:text-gray-300
        "
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 rounded-r-lg bg-green-600 text-white hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
