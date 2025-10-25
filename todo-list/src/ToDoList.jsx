import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [loadingButton, setLoadingButton] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setLoadingButton('add');
      setTimeout(() => {
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask("");
        setLoadingButton(null);
      }, 2000);
    }
  }

  function toggleTaskCompletion(index) {
    setLoadingButton(`done-${index}`);
    setTimeout(() => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);
      setLoadingButton(null);
    }, 2000);
  }

  function deleteTask(index) {
    setLoadingButton(`delete-${index}`);
    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setLoadingButton(null);
    }, 2000);
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
        <motion.button 
          className="add-button" 
          onClick={addTask}
          disabled={loadingButton === 'add'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loadingButton === 'add' ? (
            <motion.div
              style={{ width: 16, height: 16, border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', margin: '0 auto' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : 'Add'}
        </motion.button>
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
                <motion.button
                  className="done-button"
                  onClick={() => toggleTaskCompletion(index)}
                  disabled={loadingButton === `done-${index}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loadingButton === `done-${index}` ? (
                    <motion.div
                      style={{ width: 12, height: 12, border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', margin: '0 auto' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (task.completed ? "Undo" : "Done")}
                </motion.button>
                <motion.button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                  disabled={loadingButton === `delete-${index}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loadingButton === `delete-${index}` ? (
                    <motion.div
                      style={{ width: 12, height: 12, border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', margin: '0 auto' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : 'Delete'}
                </motion.button>
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
