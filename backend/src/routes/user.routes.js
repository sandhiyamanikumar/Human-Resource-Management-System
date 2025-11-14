const express = require('express');
const router = express.Router();

const { signup, verifyEmail, signin } = require('../controllers/user.controller.js');

// POST /api/users/signup
router.post('/signup', signup);
router.get('/:id/verify-email/:token', verifyEmail)
router.post('/signin', signin);

module.exports = router;
