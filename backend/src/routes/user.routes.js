const express = require('express');
const router = express.Router();

const { signup, verifyEmail } = require('../controllers/user.controller.js');

// POST /api/users/signup
router.post('/signup', signup);
router.get('/:id/verify-email/:token', verifyEmail)

module.exports = router;
