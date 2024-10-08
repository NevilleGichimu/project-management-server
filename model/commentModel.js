import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentId: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
