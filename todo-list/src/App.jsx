import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "./ToDoList.jsx";
import StarBackground from "./StarBackground.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <StarBackground />
      <Router>
        <Routes>
          <Route path="/addtodo" element={<ToDoList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
