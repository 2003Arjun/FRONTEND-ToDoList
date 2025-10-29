import React from "react";
import { useAuth } from "../context/AuthContext";
import ToDoList from "../ToDoList";

function Home() {
  const { isAuthenticated, user, loading } = useAuth();

  console.log('Home - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading);

  if (loading) {
    return <div style={{ textAlign: "center", color: "white", marginTop: "100px" }}>Loading...</div>;
  }

  if (isAuthenticated) {
    return <ToDoList />;
  }

  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "100px" }}>
      <h1>Welcome to My To-Do App</h1>
      <p>Manage your daily tasks and stay productive 🚀</p>
    </div>
  );
}

export default Home;
