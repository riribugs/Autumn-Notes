import express from "express";
import {
  getAllNotes,
  getNoteById,     // ✅ ADD THIS
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

// ✅ Create new note (rate limited)
router.post("/", rateLimiter, createNote);

// ✅ Get all notes
router.get("/", getAllNotes);

// ✅ Get a single note by ID (missing earlier)
router.get("/:id", getNoteById);

// ✅ Update a note by ID
router.put("/:id", updateNote);

// ✅ Delete a note by ID
router.delete("/:id", deleteNote);

export default router;
