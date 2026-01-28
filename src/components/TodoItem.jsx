import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const saveEdit = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm
        border border-black/10 dark:border-white/20
        ${
          todo.completed
            ? "bg-green-200 dark:bg-green-800"
            : "bg-purple-200 dark:bg-slate-700"
        }
        text-black dark:text-white
      `}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="cursor-pointer"
      />

      <input
        type="text"
        className={`
          flex-1 bg-transparent outline-none rounded-lg
          ${isTodoEditable ? "border border-black/10 dark:border-white/20 px-2" : ""}
          ${todo.completed ? "line-through opacity-70" : ""}
        `}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />

      <button
        disabled={todo.completed}
        onClick={() => (isTodoEditable ? saveEdit() : setIsTodoEditable(true))}
        className="w-8 h-8 flex items-center justify-center rounded-lg
          bg-gray-50 dark:bg-slate-600
          border border-black/10 dark:border-white/20
          hover:bg-gray-100 dark:hover:bg-slate-500
          disabled:opacity-50"
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="w-8 h-8 flex items-center justify-center rounded-lg
          bg-red-500 text-white hover:bg-red-600"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
