const express = require("express");
const router = express.Router();
const leaveController = require("./leave.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");

// Employee
router.post(
  "/apply",
  authMiddleware,
  checkPermission("leave", "create"),
  leaveController.applyLeave
);
router.get(
  "/my-leaves",
  authMiddleware,
  checkPermission("leave", "view"),
  leaveController.getMyLeaves
);

router.put(
  "/cancel/:id",
  authMiddleware,
  checkPermission("leave", "cancel"),
  leaveController.cancelLeave
);

// Admin / HR Management
router.get(
  "/",
  authMiddleware,
  checkPermission("leave", "viewAll"),
  leaveController.getAllLeaves
);
router.put(
  "/status/:id",
  authMiddleware,
  checkPermission("leave", "approve"),
  leaveController.updateLeaveStatus
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("leave", "delete"),
  leaveController.deleteLeave
);

module.exports = router;
