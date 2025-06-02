import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

workspaceSchema.index({ owner: 1 });

export const WorkSpace = mongoose.model('Workspace', workspaceSchema);