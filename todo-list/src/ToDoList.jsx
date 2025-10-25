import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { text: "Eat Breakfast", completed: false },
          { text: "Take a walk", completed: false },
          { text: "Take a shower", completed: false },
        ];
  });

  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  }

  function saveEdit(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  }

  return (
    <div className="to-do-list">
      <h1>My To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                />
                <button
                  className="save-button"
                  onClick={() => saveEdit(index)}
                  title="Save"
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <span
                  className="task-text"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black",
                  }}
                >
                  {task.text}
                </span>
                <button
                  className="edit-button"
                  onClick={() => startEditing(index)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="done-button"
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="moveUp-button"
                  onClick={() => moveTaskUp(index)}
                >
                  Up
                </button>
                <button
                  className="moveDown-button"
                  onClick={() => moveTaskDown(index)}
                >
                  Down
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
