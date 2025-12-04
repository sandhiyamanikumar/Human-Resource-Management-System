const express = require("express");
const router = express.Router();

const employeeController = require("../employee/employee.controller");
const leaveController = require("../leave/leave.controller");
const roleController = require("../role/role.controller");

const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");

//  Employee Stats (Total, Active, Pending)
router.get(
  "/employees/stats",
  authMiddleware,
  checkPermission("dashboard", "view"),
  employeeController.getEmployeeStats
);

//  Employee Department Distribution
router.get(
  "/employees/department-distribution",
  authMiddleware,
  checkPermission("dashboard", "view"),
  employeeController.getEmployeeDepartmentDistribution
);

// ✅ Leave Stats
router.get(
  "/leaves/stats",
  authMiddleware,
  checkPermission("dashboard", "view"),
  leaveController.getLeaveStats
);

//  Role-wise Count (Admin / HR / Employee)
router.get(
  "/roles/count",
  authMiddleware,
  checkPermission("dashboard", "view"),
  roleController.getRolesCount
);

module.exports = router;
