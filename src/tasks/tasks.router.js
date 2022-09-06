const express = require('express');
const { listTask,
    createTask,
    assignTask,
    softDeleteTask,
    hardDeleteTask,
    restoreTaskDeleted

} = require('./tasks.controller');
const { authorization } = require('../core/middlewares/auth.middleware');
const { ROLES } = require('../core/constant')

const router = express.Router();

router.get('/', authorization(), listTask);
router.post('/', authorization(), createTask);

router.post('/:taskId/users', authorization(ROLES.MEMBER), assignTask);
router.delete('/:id', authorization(ROLES.MEMBER), softDeleteTask);
router.delete('/:id/hard-delete', authorization(ROLES.MEMBER), hardDeleteTask);
router.put('/:id/restore', authorization(ROLES.MEMBER), restoreTaskDeleted);


module.exports = router;