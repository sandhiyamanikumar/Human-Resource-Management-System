const express = require('express');
const router = express.Router();

const { signup, verifyEmail, signin, getMe } = require('../auth/auth.controller');

const authMiddleware = require("../../middlewares/auth.middleware");

// /api/auth
router.post('/signup', signup);
router.get('/:id/verify-email/:token', verifyEmail)
router.post('/signin', signin);
router.get("/me", authMiddleware, getMe);

module.exports = router;
