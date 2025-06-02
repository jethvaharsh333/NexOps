import mongoose, {Schema} from "mongoose";

const workspaceMemberSchema = new Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    workspace: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Workspace', 
      required: true 
    },
    role: { 
      type: String,
      enum: ['ADMINISTRATOR', 'project_manager', 'team_lead', 'developer', 'qa_specialist', 
            'client', 'vendor', 'stakeholder', 'intern', 'guest'],
      required: true
    }
  }
);

workspaceMemberSchema.index({ workspace: 1, user: 1 }, { unique: true });
workspaceMemberSchema.index({ user: 1 });
workspaceMemberSchema.index({ workspace: 1 });

export const WorkspaceMember = mongoose.model('WorkspaceMember', workspaceMemberSchema);