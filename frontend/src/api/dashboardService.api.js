import axiosInstance from "./axiosInstance.js";

export const fetchEmployeeStats = () =>
  axiosInstance.get("/api/dashboard/employees/stats");
export const fetchLeaveStats = () =>
  axiosInstance.get("/api/dashboard/leaves/stats");
export const fetchRolesDistribution = () =>
  axiosInstance.get("/api/dashboard/roles/count");
export const fetchEmployeeDepartmentDistribution = () =>
  axiosInstance.get("/api/dashboard/employees/department-distribution");
