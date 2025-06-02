import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'TASK_ASSIGNED', 
      'mention', 
      'due_date', 
      'status_change',
      'new_message'
    ],
    required: true
  },
  relatedEntity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'relatedEntityModel'
  },
  relatedEntityModel: {
    type: String,
    enum: ['Task', 'Message', 'Project']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  metadata: Object // Additional context data
}, { timestamps: true });

// For quick unread notifications query
notificationSchema.index({ recipient: 1, isRead: 1 });

export const Notification = mongoose.model('Notification', notificationSchema);