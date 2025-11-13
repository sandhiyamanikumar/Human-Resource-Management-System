const express = require('express');
const router = express.Router();

const signup = require('../controllers/user.controller.js');

// POST /api/users/signup
router.post('/signup', signup);

module.exports = router;
