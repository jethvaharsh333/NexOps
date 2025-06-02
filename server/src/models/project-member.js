import mongoose, { Schema } from "mongoose";

const projectMemberSchema = new Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    roles: {
      type: String, 
      enum: ['project_manager', 'team_lead', 'developer', 'qa_specialist', 'client'],
      required: true,
    },
  }
);

projectMemberSchema.index({ project: 1, user: 1 }, { unique: true });
projectMemberSchema.index({ user: 1 });
projectMemberSchema.index({ project: 1 });

export const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);