const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getAdminDashboard } = require('../controllers/admin.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

module.exports = router;

