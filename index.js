import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import progressRoutes from "./Routes/progress.js";
import authRoutes from "./Routes/auth.js";
import Progress from "./Models/Progress.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/progress", progressRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/progress/:userId/:lessonId", async (req, res) => {
  const { userId, lessonId } = req.params;

  try {
    const progress = await Progress.findOne({ userId, lessonId });

    if (!progress) {
      return res.status(200).json({
        userId,
        lessonId,
        timeSpent: 0,
        completed: false,
      });
    }

    // Progress found, return stored values
    return res.status(200).json({
      userId: progress.userId,
      lessonId: progress.lessonId,
      timeSpent: progress.timeSpent,
      completed: progress.completed,
    });

  } catch (err) {
    console.error("❌ Error fetching progress:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all progress records for a user
app.get("/api/progress/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const progressList = await Progress.find({ userId });
    res.json(progressList);
  } catch (err) {
    console.error("Error fetching progresses:", err);
    res.status(500).json({ message: "Server error" });
  }
});




app.get("/", (req, res) => res.send("EduTracker Backend is Running 🚀"));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
