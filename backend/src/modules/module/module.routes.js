const express = require("express");
const router = express.Router();

const moduleController = require("./module.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");

// CREATE module
router.post(
    "/",
    authMiddleware,
    checkPermission("module", "create"),
    moduleController.createModule
);

// GET all modules
router.get(
    "/",
    authMiddleware,
    checkPermission("module", "view"),
    moduleController.getModules
);

// UPDATE module
router.put(
    "/:id",
    authMiddleware,
    checkPermission("module", "edit"),
    moduleController.updateModule
);

// DELETE module
router.delete(
    "/:id",
    authMiddleware,
    checkPermission("module", "delete"),
    moduleController.deleteModule
);

module.exports = router;
