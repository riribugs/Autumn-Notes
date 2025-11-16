import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios"; // import your centralized axios instance
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
        const res = await api.get(`/notes/${id}`); // use api instance, relative API call
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
        {/* The rest of your UI remains unchanged */}
        {/* Use your JSX code for display as it is */}
      </div>
    </div>
  );
};

export default NoteViewPage;
