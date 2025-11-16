import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios"; // import your centralized axios instance
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
        const res = await api.get(`/notes/${id}`); // use api instance
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
      await api.put(`/notes/${id}`, { // use api instance
        title,
        content,
      });
      toast.success("Note updated successfully!");
      navigate("/");
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
      {/* rest of your UI unchanged */}
      {/* ... */}
    </div>
  );
};

export default NoteDetailPage;
