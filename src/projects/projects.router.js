const express = require('express');
const { listProject,
    createProject,
    joinProject,
    assignProject,
    removeMember,

} = require('./projects.controller');
const { authorization } = require('../core/middlewares/auth.middleware');
const { ROLES } = require('../core/constant');

const router = express.Router();

router.get('/', authorization(), listProject);
router.post('/', authorization(ROLES.MEMBER), createProject);
router.put('/users', authorization(ROLES.MEMBER), joinProject);

router.put('/:projectId/users', authorization(ROLES.ADMIN), assignProject);
router.delete('/:projectId/users/:memberId', authorization(ROLES.MEMBER), removeMember);

module.exports = router;