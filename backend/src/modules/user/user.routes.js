// src/modules/user/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");

// GET all users
router.get("/", authMiddleware, checkPermission("role", "view"), userController.getUsers);

// ASSIGN ROLE
router.put("/:id/assign-role", authMiddleware, checkPermission("role", "edit"), userController.assignRole);

module.exports = router;
