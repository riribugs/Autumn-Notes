import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import { motion } from "framer-motion";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response && error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7E6]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#6B4423] text-[#FFF7E6] rounded-lg hover:opacity-90 transition font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </motion.button>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              boxShadow: "0 18px 44px rgba(111,78,55,0.35), 0 0 66px rgba(217,119,6,0.13)",
              scale: 1.018,
            }}
            transition={{ duration: 0.45, type: "spring", stiffness: 150, damping: 14 }}
            style={{
              background: "linear-gradient(to top, #6F4E37 0%, #FFF7E6 100%)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(111,78,55,0.20), 0 0 36px rgba(217,119,6,0.10)",
              padding: "36px",
              border: "1.5px solid rgba(111, 78, 55, 0.14)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "32px",
                color: "#6B4423",
                textShadow: "0 1px 10px rgba(111,78,55,0.13)"
              }}
            >
              Create New Note
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label style={{
                  display: "block",
                  color: "#FFF7E6",
                  fontWeight: "700",
                  marginBottom: "8px"
                }}>
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    background: "#FFF7E6",
                    borderColor: "#6B4423",
                    color: "#1f1f1f"
                  }}
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label style={{
                  display: "block",
                  color: "#FFF7E6",
                  fontWeight: "700",
                  marginBottom: "8px"
                }}>
                  Content
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="8"
                  style={{
                    background: "#FFF7E6",
                    borderColor: "#6B4423",
                    color: "#1f1f1f"
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(90deg, #D97706 30%, #FFA92A 100%)",
                    color: "#fff"
                  }}
                >
                  {loading ? "Creating..." : "Create Note"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
