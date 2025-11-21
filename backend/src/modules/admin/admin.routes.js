const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const { getAdminDashboard } = require('./admin.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

module.exports = router;

