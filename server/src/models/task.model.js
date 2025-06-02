import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
    default: 'TODO'
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  },
  dueDate: Date,
  completedAt: Date,
  attachments: [{
    url: String,
    name: String,
    type: String
  }],
  subTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  tags: [String],
}, { timestamps: true });

taskSchema.index({ project: 1 });
taskSchema.index({ assignees: 1 });
taskSchema.index({ project: 1, assignees: 1 });
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ project: 1, priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ title: 'text', description: 'text' });

export const Task = mongoose.model('Task', taskSchema);

/*
const taskSchema = new Schema({
  // ... existing fields ...
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  parentTask: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  depth: {
    type: Number,
    required: true,
    default: 1,
    max: 2 // 1 = task, 2 = subtask
  }
}, { timestamps: true });

// Add pre-save validation
taskSchema.pre('save', async function(next) {
  if (this.parentTask) {
    const parent = await mongoose.model('Task').findById(this.parentTask);
    if (!parent || parent.depth >= 2) {
      throw new Error('Maximum hierarchy depth exceeded');
    }
    this.depth = parent.depth + 1;
    this.project = parent.project; // Inherit project from parent
  }
  next();
});
*/