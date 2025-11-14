const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getHrDashboard } = require('../controllers/hr.controller');

router.get('/dashboard', authMiddleware, roleMiddleware(['hr']), getHrDashboard);

module.exports = router;
