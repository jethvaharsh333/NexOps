const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const workspaceController = require('../controllers/workspaceController');

router.post('/', authorize('workspace', 'create'), workspaceController.createWorkspace);
router.get('/:id', authorize('workspace', 'view'), workspaceController.getWorkspace);
router.put('/:id', authorize('workspace', 'edit'), workspaceController.updateWorkspace);

module.exports = router;