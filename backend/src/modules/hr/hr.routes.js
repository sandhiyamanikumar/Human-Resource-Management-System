const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');
const { getHrDashboard } = require('./hr.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['hr']), getHrDashboard);

module.exports = router;
