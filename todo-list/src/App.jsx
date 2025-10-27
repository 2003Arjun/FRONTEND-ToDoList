import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import ToDoList from "./ToDoList.jsx";
import StarBackground from "./StarBackground.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import { FaGithub } from "react-icons/fa";


function NotFound() {
  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "100px" }}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [todoData, setTodoData] = useState({ tasks: [], totalTasks: 0, completedTasks: 0 });

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
        {/* ✨ Fixed Glowing Navbar */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            padding: "15px 0",
            background: "linear-gradient(90deg, rgba(25,25,112,0.8), rgba(72,61,139,0.8))",
            boxShadow: "0 0 20px rgba(138,43,226,0.8)",
            textAlign: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#fff",
              margin: "0 20px",
              textDecoration: "none",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00FFFF")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            Home
          </Link>

          <Link
            to="/addtodo"
            style={{
              color: "#fff",
              margin: "0 20px",
              textDecoration: "none",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00FFFF")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            To-Do List
          </Link>

          <Link
            to="/about"
            style={{
              color: "#fff",
              margin: "0 20px",
              textDecoration: "none",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00FFFF")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            About
          </Link>
        </nav>

        {/* 🧭 Page Routes */}
        <div style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addtodo" element={<ToDoList onDataChange={setTodoData} />} />
            <Route path="/about" element={<About todoData={todoData} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* ✨ Fixed Bottom Navbar with GitHub */}
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "15px 0",
            background: "linear-gradient(90deg, rgba(25,25,112,0.8), rgba(72,61,139,0.8))",
            boxShadow: "0 0 20px rgba(138,43,226,0.8)",
            textAlign: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
        >
          <a
            href="https://github.com/2003Arjun"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              fontSize: "24px",
              transition: "0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00FFFF")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            <FaGithub />
          </a>
        </nav>
      </Router>
    </>
  );
}

export default App;
