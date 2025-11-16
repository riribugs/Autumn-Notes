import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Could not load note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note updated successfully!");
      navigate("/"); // Back to Home or adjust as needed
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Failed to update note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF7E6] p-6 flex items-center justify-center">
        <p className="text-[#6B4423] text-lg font-semibold">Loading note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF7E6] p-6 flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7E6] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#6B4423] text-[#FFF7E6] rounded-lg hover:opacity-90 transition font-semibold"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </button>

        {/* Edit Form */}
        <div
          className="rounded-xl shadow-lg p-8 border border-[#6B4423]/20"
          style={{
            background: "linear-gradient(to top, #6F4E37 0%, #FFF7E6 100%)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(111,78,55,0.20), 0 0 36px rgba(217,119,6,0.10)",
            border: "1.5px solid rgba(111, 78, 55, 0.14)",
            transition: "box-shadow 0.23s, transform 0.18s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1
            className="text-3xl font-bold mb-8"
            style={{
              color: "#6B4423",
              textShadow: "0 1px 10px rgba(111,78,55,0.13)",
            }}
          >
            Edit Note
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2" style={{ color: "#FFF7E6" }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                style={{
                  background: "#FFF7E6",
                  borderColor: "#6B4423",
                  color: "#1f1f1f",
                }}
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" style={{ color: "#FFF7E6" }}>
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
                style={{
                  background: "#FFF7E6",
                  borderColor: "#6B4423",
                  color: "#1f1f1f",
                }}
              />
            </div>
            <p className="text-sm" style={{ color: "#FFD699" }}>
              Created at:{" "}
              {note.createdAt
                ? new Date(note.createdAt).toLocaleString()
                : "Unknown"}
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition"
                style={{
                  background: "linear-gradient(90deg, #D97706 30%, #FFA92A 100%)",
                  color: "#fff",
                }}
              >
                Update Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
