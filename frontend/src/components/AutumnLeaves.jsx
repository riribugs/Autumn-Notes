import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Emoji leaves or use your own leaf SVG/PNG for even more realism!
const leafEmojis = ["🍂", "🍁"];

function getRandomColor() {
  const colors = ["#D97706", "#DC2626", "#F59E0B", "#A16207", "#C7410C"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const AutumnLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startLeft: Math.random() * window.innerWidth,
      duration: 7 + Math.random() * 5,
      delay: Math.random() * 5,
      emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
      color: getRandomColor(),
      size: 32 + Math.random() * 28
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {leaves.map(leaf => (
        <motion.div
          key={leaf.id}
          initial={{
            y: -60, x: leaf.startLeft,
            scale: 1,
            opacity: 1,
            rotate: Math.random() * 60 - 30
          }}
          animate={{
            y: [0, window.innerHeight / 2.2, window.innerHeight + 40],
            x: [leaf.startLeft, leaf.startLeft + (Math.random() - 0.5) * 130, leaf.startLeft + (Math.random() - 0.5) * 200],
            scale: [1, 0.97, 1.07],
            opacity: [1, 0.2, 0],
            rotate: [
              Math.random() * 30 - 15,
              Math.random() * 45,
              Math.random() * 30 - 15,
            ]
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            left: 0, top: 0,
            fontSize: `${leaf.size}px`,
            color: leaf.color,
            filter: "drop-shadow(0 4px 12px rgba(111,78,55,0.16))"
          }}
        >
          {leaf.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default AutumnLeaves;

