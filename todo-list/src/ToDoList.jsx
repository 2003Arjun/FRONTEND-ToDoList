import React, { useState, useEffect } from 'react';

function ToDoList() {
  // ⬇ Load saved tasks from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    // if found, convert from string to array
    return savedTasks ? JSON.parse(savedTasks) : ["Eat Breakfast", "take a walk", "take a shower"];
  });

  const [newTask, setNewTask] = useState('');

  // ⬇ Save tasks into localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className='add-button' onClick={addTask}>Add</button>

        <div>
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                <span className="text">{task}</span>
                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                <button className="moveUp-button" onClick={() => moveTaskUp(index)}>Up</button>
                <button className="movedown-button" onClick={() => moveTaskDown(index)}>Down</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
