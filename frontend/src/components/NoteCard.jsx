import { Trash2Icon, PenSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { motion } from "framer-motion";

const formatDate = (date) => {
  if (!date) return "Unknown Date";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  hover: { 
    scale: 1.05, 
    y: -8, 
    boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
};

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure? This will delete the note.")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Deleted");
      setTimeout(() => window.location.reload(), 300);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="visible"
      whileHover="hover"
      className="rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/notes/view/${note._id}`)}
    >
      <div style={{
        background: "linear-gradient(to top, #6F4E37 0%, #FFF7E6 100%)",
        color: "#FFF7E6",
        padding: "28px",
        borderRadius: "20px",
        boxShadow: "0 8px 24px rgba(111,78,55,0.15), 0 0 30px rgba(217,119,6,0.08)",
        transition: "all 0.3s ease",
        border: "1.5px solid rgba(255, 247, 230, 0.1)",
        position: "relative",
        overflow: "hidden"
      }}>
        
        {/* Decorative Gradient Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
          
          {/* Icon Container - Pure Ombre Gradient */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(217, 119, 6, 0.8), rgba(217, 119, 6, 0.5) 40%, rgba(111, 78, 55, 0.3) 100%)",
              borderRadius: "20px",
              padding: "12px",
              boxShadow: "0 15px 40px rgba(217, 119, 6, 0.25), inset 0 1px 2px rgba(255,255,255,0.1)",
              border: "none",
              backdropFilter: "blur(15px)"
            }}>
            
            <img
              src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png"
              alt="note"
              style={{ 
                height: "120px", 
                width: "120px", 
                borderRadius: "14px", 
                objectFit: "contain",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
              }}
            />
          </motion.div>

          {/* Title - Enhanced */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              marginTop: "20px",
              fontSize: "18px",
              fontWeight: "700",
              color: "#FFE8CC",
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              letterSpacing: "0.5px"
            }}>
            {note.title}
          </motion.h3>

          {/* Content - Enhanced */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "rgba(255, 232, 204, 0.75)",
              textAlign: "center",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: "1.4"
            }}>
            {note.content}
          </motion.p>

          {/* Footer */}
          <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 247, 230, 0.1)"
          }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: "12px",
                color: "rgba(255, 232, 204, 0.6)",
                fontWeight: "500",
                letterSpacing: "0.3px"
              }}>
              {formatDate(note.createdAt)}
            </motion.span>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Edit Button - Enhanced */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/notes/${note._id}`);
                }}
                style={{
                  backgroundColor: "rgba(255, 232, 204, 0.15)",
                  border: "1.5px solid rgba(255, 232, 204, 0.3)",
                  padding: "10px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 232, 204, 0.25)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 232, 204, 0.15)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
              >
                <PenSquareIcon style={{ width: "18px", height: "18px", color: "#FFE8CC" }} />
              </motion.button>

              {/* Delete Button - Enhanced */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleDelete(e, note._id)}
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1.5px solid rgba(239, 68, 68, 0.3)",
                  padding: "10px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.25)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
                }}
              >
                <Trash2Icon style={{ width: "18px", height: "18px", color: "#ef4444" }} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
