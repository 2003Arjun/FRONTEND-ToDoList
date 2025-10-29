import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ProjectProvider>
  </StrictMode>
);
