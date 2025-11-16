import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

// 1️⃣ Load environment variables first
dotenv.config();

// 2️⃣ Initialize express app
const app = express();
const __dirname = path.resolve();

// 3️⃣ Apply middleware

// CORS setup for development and production
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // frontend dev server URL
    })
  );
} else {
  app.use(
    cors({
      origin: "https://autumn-notes.onrender.com", // your deployed frontend URL
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// 4️⃣ Define routes
app.use("/api/notes", notesRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// 5️⃣ Start server after DB connects
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  });
});
