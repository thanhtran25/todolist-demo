const express = require('express');
const {
    bigProject,
    countProject,
} = require('./statistics.controller');
const { authorization } = require('../core/middlewares/auth.middleware');
const { ROLES } = require('../core/constant');

const router = express.Router();

router.get('/projects/users', authorization(ROLES.ADMIN), bigProject);
router.get('/projects', authorization(ROLES.ADMIN), countProject);


module.exports = router;