import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['PLANNING', 'ACTIVE', 'ON_HOLD', 'ARCHIVED', 'COMPLETED'],
    default: 'PLANNING'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  startDate: Date,
  dueDate: Date,
  attachments: [{
    url: String,
    name: String,
    type: String
  }],
  tags: [String],
}, { timestamps: true });

projectSchema.index({ workspace: 1 });
projectSchema.index({ workspace: 1, name: 1 });
projectSchema.index({ workspace: 1, status: 1 });      
projectSchema.index({ dueDate: 1 });

export const Project = mongoose.model('Project', projectSchema);