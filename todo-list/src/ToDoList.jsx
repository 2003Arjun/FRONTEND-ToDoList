import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchApi } from './services/fetchApi';
import { axiosApi } from './services/axiosApi';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [loadingButton, setLoadingButton] = useState(null);
  const [apiType, setApiType] = useState('fetch');

  useEffect(() => {
    loadTasks();
  }, [apiType]);

  const getApi = () => apiType === 'fetch' ? fetchApi : axiosApi;

  async function loadTasks() {
    try {
      setLoadingButton('load');
      const data = await getApi().getTodos();
      const formattedTasks = data.map(item => ({
        id: item.id,
        text: item.title,
        completed: item.completed
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      const savedTasks = localStorage.getItem("tasks");
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    } finally {
      setLoadingButton(null);
    }
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      setLoadingButton('add');
      try {
        const newTodo = {
          title: newTask,
          completed: false,
          userId: 1
        };
        const createdTodo = await getApi().createTodo(newTodo);
        setTasks([...tasks, {
          id: createdTodo.id || Date.now(),
          text: createdTodo.title,
          completed: createdTodo.completed
        }]);
        setNewTask("");
      } catch (error) {
        console.error('Error adding task:', error);
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
      } finally {
        setLoadingButton(null);
      }
    }
  }

  async function toggleTaskCompletion(index) {
    setLoadingButton(`done-${index}`);
    try {
      const task = tasks[index];
      const updatedTodo = {
        ...task,
        completed: !task.completed
      };
      await getApi().updateTodo(task.id, updatedTodo);
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);
    } finally {
      setLoadingButton(null);
    }
  }

  async function deleteTask(index) {
    setLoadingButton(`delete-${index}`);
    try {
      const task = tasks[index];
      await getApi().deleteTodo(task.id);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } finally {
      setLoadingButton(null);
    }
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

  async function saveEdit(index) {
    try {
      const task = tasks[index];
      const updatedTodo = {
        ...task,
        title: editedText
      };
      await getApi().updateTodo(task.id, updatedTodo);
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editedText;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating task:', error);
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editedText;
      setTasks(updatedTasks);
      setEditingIndex(null);
    }
  }

  return (
    <div className="to-do-list">
      <h1>My To-Do List</h1>
      
      <div className="api-selector">
        <label>
          <input
            type="radio"
            value="fetch"
            checked={apiType === 'fetch'}
            onChange={(e) => setApiType(e.target.value)}
          />
          Fetch API
        </label>
        <label>
          <input
            type="radio"
            value="axios"
            checked={apiType === 'axios'}
            onChange={(e) => setApiType(e.target.value)}
          />
          Axios
        </label>
        <button onClick={loadTasks} disabled={loadingButton === 'load'}>
          {loadingButton === 'load' ? 'Loading...' : 'Reload Tasks'}
        </button>
      </div>
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
          <li key={task.id || index}>
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
