const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const { getEmployeeDashboard } = require('./employee.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['employee']), getEmployeeDashboard);

module.exports = router;
