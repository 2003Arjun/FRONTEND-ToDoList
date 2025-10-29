import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todoData, setTodoData] = useState({
    tasks: [],
    totalTasks: 0,
    completedTasks: 0
  });

  const updateTodoData = (newData) => {
    setTodoData(newData);
  };

  return (
    <TodoContext.Provider value={{ todoData, updateTodoData }}>
      {children}
    </TodoContext.Provider>
  );
};