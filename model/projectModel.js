import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'On Hold'], 
    required: true 
  },
  startDate: { type: Date },
  endDate: { type: Date },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
