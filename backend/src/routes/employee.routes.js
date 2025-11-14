const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getEmployeeDashboard } = require('../controllers/employee.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['employee']), getEmployeeDashboard);

module.exports = router;
