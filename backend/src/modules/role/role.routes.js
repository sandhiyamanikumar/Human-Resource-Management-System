const express = require('express');
const router = express.Router();
const roleController = require('./role.controller');
const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");

// CREATE
router.post(
    "/",
    authMiddleware,
    checkPermission("role", "create"),
    roleController.createRole
);

// READ
router.get(
    "/",
    authMiddleware,
    checkPermission("role", "view"),
    roleController.getRoles
);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    checkPermission("role", "edit"),
    roleController.updateRole
);

// DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkPermission("role", "delete"),
    roleController.deleteRole
);

module.exports = router;
