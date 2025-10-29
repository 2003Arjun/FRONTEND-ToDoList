import React from "react";
import { motion } from "framer-motion";

function AnimatedButton() {
  return (
    <motion.button
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: 8,
        border: "none",
        backgroundColor: "#48bb78",
        color: "white",
        cursor: "pointer",
        margin: "20px auto",
        display: "block",
      }}
      whileHover={{ scale: 1.2, backgroundColor: "#38a169" }}
      whileTap={{ scale: 0.9 }}
    >
      Hover Me
    </motion.button>
  );
}

export default AnimatedButton;
