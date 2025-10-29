import React, { createContext, useContext, useState, useEffect } from 'react';
import { todoAPI } from '../services/api';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const todoData = {
    tasks,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length
  };

  const fetchTodos = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const todos = await todoAPI.getTodos();
      setTasks(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = await todoAPI.createTodo({ title });
      setTasks(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTodo : task));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  return (
    <TodoContext.Provider value={{ 
      todoData, 
      loading,
      addTodo,
      updateTodo,
      deleteTodo,
      fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
};