import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { WorkSpace } from "../models/workspace.model.js";

export const validateWorkspace = async (req, res, next) => {
  const workspace = await WorkSpace.findById(req.params.workspaceId)
    .select('name');
  if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
  
  req.workspace = workspace;

  console.log("WorkSpace context middleware================================");
  next();
};

export const validateProject = async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    workspace: req.workspace._id
  }).select('name workspace');
  
  if (!project) return res.status(404).json({ error: 'Project not found' });
  req.project = project;

  console.log("Project context middleware================================");
  next();
};

export const validateTask = async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    project: req.project._id
  }).select('project'); // Avoid deep population

  if (!task) return res.status(404).json({ error: 'Task not found' });
  req.task = task;

  console.log("Task context middleware================================");
  next();
};