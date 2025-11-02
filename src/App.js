import "./App.css";
import { useMemo } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import useLocalStorage from "./hooks/useLocalStorage";

function uid() {
  // simple unique id good enough for UI
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useLocalStorage("filter", "all");

  function addTodo(title) {
    setTodos((prev) => [{ id: uid(), title, completed: false }, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter(t => t.id !== id));
  }

  function editTodo(id, title) {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, title } : t));
  }

  function clearDone() {
    setTodos((prev) => prev.filter(t => !t.completed));
  }

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "done") return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div className="wrap">
      <header className="header">
        <h1 className="title">Todo App</h1>
        <p className="muted">{remaining} task{remaining !== 1 ? "s" : ""} remaining</p>
      </header>

      <TodoForm onAdd={addTodo} />

      <FilterBar filter={filter} setFilter={setFilter} clearDone={clearDone} />

      <TodoList
        items={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <footer className="footer">
        <small>Saved locally • React + CRA</small>
      </footer>
    </div>
  );
}
