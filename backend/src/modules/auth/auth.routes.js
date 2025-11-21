const express = require('express');
const router = express.Router();

const { signup, verifyEmail, signin } = require('../auth/auth.controller');

// /api/auth
router.post('/signup', signup);
router.get('/:id/verify-email/:token', verifyEmail)
router.post('/signin', signin);

module.exports = router;
