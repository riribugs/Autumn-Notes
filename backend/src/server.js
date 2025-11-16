import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

// 1️⃣ Load environment variables first
dotenv.config();

// 2️⃣ Initialize express app
const app = express();

// 3️⃣ Apply middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(rateLimiter);

// 4️⃣ Define routes
app.use("/api/notes", notesRoutes);

// 5️⃣ Start server after DB connects
const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  });
});
