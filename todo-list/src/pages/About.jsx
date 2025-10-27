import React from "react";

function About({ todoData }) {
  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "100px" }}>
      <h1>About This App</h1>
      <p>This is a simple To-Do List project built with React.</p>
      
      <div style={{ marginTop: "30px", padding: "20px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", maxWidth: "400px", margin: "30px auto" }}>
        <h3>Todo Statistics</h3>
        <p>Total Tasks: {todoData.totalTasks}</p>
        <p>Completed Tasks: {todoData.completedTasks}</p>
        <p>Remaining Tasks: {todoData.totalTasks - todoData.completedTasks}</p>
      </div>
    </div>
  );
}

export default About;

