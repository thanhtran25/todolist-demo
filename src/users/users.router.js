const express = require('express');
const {
    register,
    login,
} = require('./users.controller');
const { authorization } = require('../core/middlewares/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;