import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="row">
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        aria-label="New todo"
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
