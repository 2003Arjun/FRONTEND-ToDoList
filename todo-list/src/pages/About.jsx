import React from "react";
import { useTodo } from "../context/TodoContext.jsx";
import { useProject } from "../context/ProjectContext.jsx";

function About() {
  const { todoData } = useTodo();
  const { projectData } = useProject();
  
  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "20px", padding: "0 20px" }}>
      <h1 style={{ marginBottom: "30px", color: "#00FFFF" }}>{projectData.name}</h1>
      <p style={{ fontSize: "18px", marginBottom: "40px" }}>{projectData.description}</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "20px", minWidth: "300px", flex: "1" }}>
          <h3 style={{ color: "#00FFFF", marginBottom: "15px" }}>Technologies Used</h3>
          {projectData.technologies.map((tech, index) => (
            <div key={index} style={{ marginBottom: "10px", textAlign: "left" }}>
              <strong>{tech.name}</strong> v{tech.version} - {tech.description}
            </div>
          ))}
        </div>
        
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "20px", minWidth: "300px", flex: "1" }}>
          <h3 style={{ color: "#00FFFF", marginBottom: "15px" }}>Features</h3>
          {projectData.features.map((feature, index) => (
            <div key={index} style={{ marginBottom: "8px", textAlign: "left" }}>• {feature}</div>
          ))}
        </div>
        
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "20px", minWidth: "300px", flex: "1" }}>
          <h3 style={{ color: "#00FFFF", marginBottom: "15px" }}>Todo Statistics</h3>
          <p>Total Tasks: {todoData.totalTasks}</p>
          <p>Completed Tasks: {todoData.completedTasks}</p>
          <p>Remaining Tasks: {todoData.totalTasks - todoData.completedTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default About;

