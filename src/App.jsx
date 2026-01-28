import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [activePage, setActivePage] = useState("home");

  /* ---------------- TODOS LOGIC ---------------- */
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  /* ---------------- LOCAL STORAGE ---------------- */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const storedTheme = localStorage.getItem("theme");

    if (storedTodos) setTodos(storedTodos);
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors">
        {/* ---------- NAVBAR ---------- */}
        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-slate-800">
          <div className="flex gap-4">
            <button
              onClick={() => setActivePage("home")}
              className={`font-semibold ${
                activePage === "home"
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage("about")}
              className={`font-semibold ${
                activePage === "about"
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              About
            </button>
          </div>

          <button
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-slate-700 text-sm"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </nav>

        {/* ---------- CONTENT ---------- */}
        {activePage === "home" ? (
          <div className="py-8">
            <div className="max-w-2xl mx-auto px-4 py-6 rounded-lg shadow-md bg-white dark:bg-slate-800 text-black dark:text-white">
              <h1 className="text-2xl font-bold text-center mb-8">
                Manage Your Todos
              </h1>

              <TodoForm />

              <div className="mt-4 flex flex-col gap-3">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow-md bg-white dark:bg-slate-800 text-black dark:text-white">
            <h2 className="text-xl font-bold mb-3">About</h2>
            <p>
              This Todo app is built using React, Context API, Vite, and Tailwind
              CSS. It supports persistent storage and dark/light themes.
            </p>
          </div>
        )}
      </div>
    </TodoProvider>
  );
}

export default App;
