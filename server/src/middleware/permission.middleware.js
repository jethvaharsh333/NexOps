import { ROLE_POLICIES } from '../constants.js';
import { ProjectMember } from '../models/project-member.js';
import { WorkspaceMember } from '../models/workspace-member';
import { asyncHandler } from '../utils/asyncHandler.js';

export const checkResourcePermission = (resourceType, action) => 
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const resource = req[resourceType];

    if (resource.owner?.equals(user._id)) return next();

    const [workspaceRole, projectRole] = await Promise.all([
      WorkspaceMember.findOne({
        user: user._id,
        workspace: req.workspace._id
      }).select('role'),
      
      resourceType === 'task' || resourceType === 'project'
        ? ProjectMember.findOne({
            user: user._id,
            project: req.project?._id
          }).select('role')
        : null
    ]);

    // Check policy
    const effectiveRole = projectRole?.roles || workspaceRole?.role || 'guest';
    const policy = ROLE_POLICIES[effectiveRole]?.[resourceType];
    if (!policy) return res.status(403).json({ error: 'Access denied' });

    const hasAccess = typeof policy[action] === 'function' 
      ? policy[action](user, resource)
      : policy[action];

    console.log("permission middleware=========================================")
    console.log("recourseType: " + resourceType + "action: " + action);
    console.log("effectiveRole: " + effectiveRole + "hasAccess: " + hasAccess);

    hasAccess ? next() : res.status(403).json({ error: 'Insufficient permissions' });
    // res.status(500).json({ error: 'Permission check failed' });
});


/*

// routes/tasks.js
router.get('/workspaces/:workspaceId/projects/:projectId/tasks/:taskId',
  validateWorkspace, // 1. Validate workspace
  validateProject,   // 2. Validate project
  validateTask,      // 3. Validate task
  checkPermission('task', 'view'), // 4. Check permission
  async (req, res) => {
    // Return pre-validated task
    res.json(await Task.findById(req.task._id)
      .populate('assignees', 'name email') // Only populate when needed
      .populate('project', 'name')
    );
  }
);

*/

/**

const rolePriority = [
    'administrator',
    'project_manager',
    'team_lead',
    'qa_specialist',
    'developer',
    'client',
    'vendor',
    'stakeholder',
    'intern',
    'guest'
  ];

 */