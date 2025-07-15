import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lessonId: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  viewedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
