import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['To-do', 'In Progress', 'Done'], 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
