import TodoItem from "./TodoItem";

export default function TodoList({ items, onToggle, onDelete, onEdit }) {
  if (items.length === 0) {
    return <p className="muted">No tasks here. Add one above!</p>;
  }
  return (
    <ul className="list">
      {items.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
