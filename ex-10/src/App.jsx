import React, { useState } from "react";
import "./App.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Study React Component State & Props",
      completed: true,
    },
    {
      id: 2,
      text: "Design Controlled Registration Form",
      completed: true,
    },
    {
      id: 3,
      text: "Implement Client Router Navigation",
      completed: false,
    },
    {
      id: 4,
      text: "Master React Hooks Architecture",
      completed: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  // Add a new task
  const addTodo = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos((previous) => [...previous, newTodo]);
    setInput("");
  };

  // Mark a task as completed or active
  const toggleTodo = (id) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos((previous) =>
      previous.filter((todo) => todo.id !== id)
    );
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTodos((previous) =>
      previous.filter((todo) => !todo.completed)
    );
  };

  // Count remaining tasks
  const remaining = todos.filter(
    (todo) => !todo.completed
  ).length;

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      {/* Add Task Form */}
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new exercise task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" className="add-button">
          <span>＋</span> Add Task
        </button>
      </form>

      {/* Task Count and Filters */}
      <div className="todo-toolbar">
        <span className="remaining-count">
          {remaining} {remaining === 1 ? "task" : "tasks"} remaining
        </span>

        <div className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-button ${
                filter === item ? "selected" : ""
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${
              todo.completed ? "completed" : ""
            }`}
          >
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              <span className="checkmark"></span>

              <span className="todo-text">{todo.text}</span>
            </label>

            <button
              type="button"
              className="delete-button"
              aria-label={`Delete ${todo.text}`}
              onClick={() => deleteTodo(todo.id)}
              title="Delete task"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 10v6M14 10v6" />
              </svg>
            </button>
          </li>
        ))}

        {filteredTodos.length === 0 && (
          <li className="empty-message">
            No {filter.toLowerCase()} tasks found.
          </li>
        )}
      </ul>

      {/* Clear Completed Tasks */}
      <div className="todo-footer">
        <button
          type="button"
          className="clear-button"
          onClick={clearCompleted}
          disabled={!todos.some((todo) => todo.completed)}
        >
          ↻ Clear Completed Tasks
        </button>
      </div>
    </div>
  );
}