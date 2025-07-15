import express from "express";
import Progress from "../Models/Progress.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { userId, lessonId, timeSpent, completed, moduleName } = req.body;

  try {
    let progress = await Progress.findOne({ userId, lessonId });

    if (!progress) {
      progress = new Progress({ userId, lessonId, moduleName, timeSpent, completed });
    } else {
      progress.timeSpent = timeSpent;
      if (completed) progress.completed = true;
      progress.moduleName = moduleName || progress.moduleName;
      progress.updatedAt = Date.now();
    }

    await progress.save();
    res.json({ message: "Progress saved", progress });
  } catch (err) {
    console.error("Error saving progress:", err);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

export default router;
