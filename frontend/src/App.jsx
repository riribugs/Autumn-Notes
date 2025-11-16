import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NoteViewPage from "./pages/NoteViewPage";
import { Toaster } from "react-hot-toast";
import AutumnLeaves from "./components/AutumnLeaves";

const App = () => {
  return (
    <>
      <style>{`
        body { background-color: #FFF7E6 !important; }
        html { background-color: #FFF7E6 !important; }
        #root { background-color: #FFF7E6 !important; }
      `}</style>
      <div style={{ backgroundColor: "#FFF7E6", minHeight: "100vh", position: "relative", width: "100vw" }}>
        {/* Falling leaves as visual background */}
        <AutumnLeaves />
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/notes/view/:id" element={<NoteViewPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
