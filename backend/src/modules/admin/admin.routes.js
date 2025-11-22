const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/role.middleware');
const { getAdminDashboard } = require('./admin.controller');

router.get(
    '/dashboard',
    authMiddleware,
    checkPermission("dashboard", "view"),
    getAdminDashboard
);

module.exports = router;
