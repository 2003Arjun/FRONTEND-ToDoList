import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "./ToDoList.jsx";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addtodo" element={<ToDoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
