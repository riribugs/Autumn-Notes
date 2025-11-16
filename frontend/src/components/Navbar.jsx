import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header
      style={{
        background: "linear-gradient(90deg, #3E2723 0%, #B98856 100%)",
        padding: "20px 28px",
        boxShadow: "0 12px 28px 0 rgba(60,30,10,0.16), 0 1px 0 0 #FFF7E675 inset",
        borderBottom: "2.5px solid rgba(255,247,230,0.17)",
        position: "relative",
        backdropFilter: "blur(9px)",
        zIndex: 20,
        borderRadius: "0 0 32px 32px",
        overflow: "visible"
      }}
    >
      {/* Floating Leaf accent (positioned top left, subtle and animated) */}
      <motion.span
        initial={{ y: -15, rotate: -30, opacity: 0.77 }}
        animate={{ y: [-15, 6, -15], rotate: [-30, 10, -30] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute",
          top: -18,
          left: 34,
          fontSize: 38,
          filter: "blur(0.7px) opacity(0.47) drop-shadow(0 2px 8px #B98856)",
          pointerEvents: "none",
        }}
        aria-label="leaf-accent"
      >
        🍁
      </motion.span>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          {/* TITLE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main Title - glowing golden gradient */}
            <h1
              style={{
                fontFamily: "'Merriweather', serif",
                color: "#FFF7E6",
                fontSize: "2.5rem",
                fontWeight: "900",
                margin: "0",
                letterSpacing: "1px",
                background: "linear-gradient(90deg, #FFE8CC, #FFF7E6 60%, #FFD699 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 30px #ffd69990, 0 0 10px #fff7e660",
                filter: "drop-shadow(0 4px 16px #d5a77050)",
                animation: "glow 4s ease-in-out infinite",
                transition: "color 0.5s"
              }}
            >
              Autumn Notes
            </h1>
            {/* Subtitle - subtle gold-cream */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                color: "rgba(255,247,230,0.85)",
                fontSize: "15px",
                margin: "4px 0 0 0",
                fontStyle: "italic",
                fontWeight: "500",
                letterSpacing: "0.7px",
                textShadow: "0 1px 5px #ffe8cc60"
              }}
            >
              Where your thoughts feel warm.
            </motion.p>
          </motion.div>
          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/create"
              style={{
                background: "linear-gradient(89deg, #FFD699 0%, #D97706 100%)",
                color: "#6F4E37",
                padding: "13px 27px",
                borderRadius: "22px",
                textDecoration: "none",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "17px",
                transition: "all 0.25s cubic-bezier(.23,1.11,.63,1.05)",
                boxShadow:
                  "0 6px 19px 0 #FFD69990, 0 1.5px 0 0 #fff7e651 inset, 0 2px 9px 1px #FFD69915",
                letterSpacing: "0.2px"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow =
                  "0 12px 32px 0 #FFD699bb, 0 1.5px 0 0 #fff7e6aa inset, 0 3px 12px 2px #FFD69925";
                e.currentTarget.style.background =
                  "linear-gradient(80deg, #FFA92A 7%, #FFD699 93%)";
                e.currentTarget.style.transform = "scale(1.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow =
                  "0 6px 19px 0 #FFD69990, 0 1.5px 0 0 #fff7e651 inset, 0 2px 9px 1px #FFD69915";
                e.currentTarget.style.background =
                  "linear-gradient(89deg, #FFD699 0%, #D97706 100%)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <PlusIcon style={{ width: 22, height: 22, filter: "drop-shadow(0 2px 4px #D9770650)" }} />
              <span>New Note</span>
            </Link>
          </motion.div>
        </div>
      </div>
      {/* End floating leaf accent */}
    </header>
  );
};

export default Navbar;
