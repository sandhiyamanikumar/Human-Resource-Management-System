const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/role.middleware')
const { getEmployeeDashboard } = require('./employee.controller');

router.get(
    '/dashboard', 
    authMiddleware, 
    checkPermission("dashboard", "view"), 
    getEmployeeDashboard);

module.exports = router;
