const options = ["all", "active", "done"];

export default function FilterBar({ filter, setFilter, clearDone }) {
  return (
    <div className="row space-between">
      <div className="segmented">
        {options.map((opt) => (
          <button
            key={opt}
            className={`chip ${filter === opt ? "chip-active" : ""}`}
            onClick={() => setFilter(opt)}
            aria-pressed={filter === opt}
          >
            {opt[0].toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
      <button className="btn ghost" onClick={clearDone}>Clear completed</button>
    </div>
  );
}
