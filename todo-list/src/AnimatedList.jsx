import React from "react";
import { motion } from "framer-motion";

const tasks = [""];

function AnimatedList() {
  return (
    <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
      {tasks.map((task, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            backgroundColor: "#667eea",
            color: "#fff",
            borderRadius: 8,
          }}
        >
          {task}
        </motion.li>
      ))}
    </ul>
  );
}

export default AnimatedList;
