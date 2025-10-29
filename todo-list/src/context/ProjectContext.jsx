import React, { createContext, useContext } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const projectData = {
    name: "React Todo List",
    version: "1.0.0",
    description: "A modern, animated todo list application built with React and Vite",
    technologies: [
      { name: "React", version: "19.1.1", description: "UI Library" },
      { name: "Vite", version: "7.1.7", description: "Build Tool" },
      { name: "React Router", version: "7.9.4", description: "Routing" },
      { name: "Framer Motion", version: "12.23.24", description: "Animations" },
      { name: "Axios", version: "1.12.2", description: "HTTP Client" },
      { name: "React Icons", version: "5.5.0", description: "Icons" }
    ],
    features: [
      "Add, edit, and delete todos",
      "Mark todos as complete",
      "Animated UI components",
      "Star background animation",
      "Responsive design",
      "Context API state management"
    ]
  };

  return (
    <ProjectContext.Provider value={{ projectData }}>
      {children}
    </ProjectContext.Provider>
  );
};