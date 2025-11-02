import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  function handleSave() {
    const t = draft.trim();
    if (!t) { setEditing(false); return; }
    onEdit(todo.id, t);
    setEditing(false);
  }

  return (
    <li className="todo">
      <label className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.title}" ${todo.completed ? "active" : "done"}`}
        />
        {editing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <span className={todo.completed ? "done" : ""}>{todo.title}</span>
        )}
      </label>

      <div className="todo-actions">
        {editing ? (
          <button className="btn small" onClick={handleSave}>Save</button>
        ) : (
          <button className="btn small ghost" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn small danger" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}
