import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  channel: {
    type: String,
    enum: ['general', 'project', 'task', 'direct'],
    required: true
  },
  context: {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  attachments: [{
    url: String,
    type: String
  }],
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

// Optimize for message fetching
messageSchema.index({ workspace: 1, channel: 1, createdAt: -1 });
messageSchema.index({ 'context.task': 1 });

export const Message = mongoose.model('Message', messageSchema);