import React from "react";
import { motion } from "framer-motion";

function AnimatedBox() {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "#667eea",
        margin: "50px auto",
        borderRadius: 12,
      }}
      animate={{ rotate: 360, scale: 1.5 }} // Final animation state
      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
    >
      {/* This box rotates and scales infinitely */}
    </motion.div>
  );
}

export default AnimatedBox;
