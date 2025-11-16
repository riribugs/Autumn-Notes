import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Copy, Share2, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "react-hot-toast";

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error("Error fetching note", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#FFF7E6] p-6 flex items-center justify-center">
        <p className="text-[#6B4423] text-lg font-semibold">Loading...</p>
      </div>
    );

  if (!note)
    return (
      <div className="min-h-screen bg-[#FFF7E6] p-6 flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">Note not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFF7E6] p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            background: "linear-gradient(to top, #6F4E37 0%, #FFF7E6 100%)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(111,78,55,0.20), 0 0 36px rgba(217,119,6,0.10)",
            padding: "36px",
            border: "1.5px solid rgba(111, 78, 55, 0.14)"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 18px 44px rgba(111,78,55,0.35), 0 0 66px rgba(217,119,6,0.13)";
            e.currentTarget.style.transform = "scale(1.015)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(111,78,55,0.20), 0 0 36px rgba(217,119,6,0.10)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* TOP BAR */}
          <div className="flex justify-between items-start mb-6">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                background: "rgba(255, 232, 204, 0.15)",
                color: "#FFF7E6",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "1.5px solid rgba(255, 232, 204, 0.3)",
                cursor: "pointer",
                transition: "all 0.2s",
                backdropFilter: "blur(10px)"
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>

            {/* Copy + Share */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  background: "linear-gradient(90deg, #D97706 30%, #FFA92A 100%)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
                onClick={() => {
                  navigator.clipboard.writeText(note.content);
                  toast.success("Copied to clipboard!");
                }}
              >
                <Copy className="w-4 h-4" />
                Copy
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  background: "linear-gradient(90deg, #D97706 30%, #FFA92A 100%)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: note.title,
                      text: note.content,
                    });
                  } else {
                    toast.error("Sharing not supported.");
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#FFF7E6",
              marginBottom: "8px",
              textShadow: "0 1px 10px rgba(111,78,55,0.13)"
            }}
          >
            {note.title}
          </motion.h1>

          <p style={{ color: "rgba(255, 232, 204, 0.7)", fontSize: "14px", marginBottom: "24px" }}>
            Created:{" "}
            {note.createdAt
              ? new Date(note.createdAt).toLocaleString()
              : "Unknown"}
          </p>

          <hr style={{ borderColor: "rgba(255, 247, 230, 0.1)", marginBottom: "24px" }} />

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{
              fontSize: "16px",
              lineHeight: "1.8",
              color: "#FFF7E6"
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
              {note.content}
            </ReactMarkdown>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoteViewPage;
