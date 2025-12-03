const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/role.middleware");
const employeeController = require("./employee.controller");

// -----------------------------
// Dashboard route
// -----------------------------
router.get(
  "/dashboard",
  authMiddleware,
  checkPermission("dashboard", "view"),
  employeeController.getEmployeeDashboard
);

// -----------------------------
// Create employee
// -----------------------------
router.post(
  "/",
  authMiddleware,
  checkPermission("employee", "create"),
  employeeController.createEmployee
);

// -----------------------------
// Get all employees
// -----------------------------
router.get(
  "/",
  authMiddleware,
  checkPermission("employee", "view"),
  employeeController.getAllEmployees
);

// -----------------------------
// Get unlinked users
// MUST COME BEFORE :id
// -----------------------------
router.get(
  "/unlinked-users",
  authMiddleware,
  checkPermission("employee", "edit"),
  employeeController.getUnlinkedUsers
);

// -----------------------------
// Get logged-in employee profile
// MUST COME BEFORE :id
// -----------------------------
router.get("/me", authMiddleware, employeeController.getMyProfile);

// -----------------------------
// Get employee by ID (must be last)
// -----------------------------
router.get(
  "/:id",
  authMiddleware,
  checkPermission("employee", "view"),
  employeeController.getEmployeeById
);

// -----------------------------
// Update employee
// -----------------------------
router.put(
  "/:id",
  authMiddleware,
  checkPermission("employee", "edit"),
  employeeController.updateEmployee
);

// -----------------------------
// Delete employee
// -----------------------------
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("employee", "delete"),
  employeeController.deleteEmployee
);

module.exports = router;
