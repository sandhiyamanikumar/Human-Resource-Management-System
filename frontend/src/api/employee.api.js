import axiosInstance from "./axiosInstance";

const API_URL = "/api/employee";

// GET employees with pagination + filters
export const getEmployees = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`${API_URL}?${query}`);
  return res.data;
};

// CREATE employee
export const createEmployee = async (payload) => {
  const res = await axiosInstance.post(API_URL, payload);
  return res;
};

// GET logged-in employee profile (new)
export const getMyProfile = async () => {
  const res = await axiosInstance.get(`${API_URL}/me`);
  return res.data;
};

// GET users who are not linked to employee table
export const getUnlinkedUsers = async () => {
  const res = await axiosInstance.get(`${API_URL}/unlinked-users`);
  return res.data;
};

// GET employee by ID
export const getEmployeeById = async (id) => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data;
};

// UPDATE employee
export const updateEmployee = async (id, payload) => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, payload);
  return res;
};

// DELETE employee
export const deleteEmployee = async (id) => {
  const res = await axiosInstance.delete(`${API_URL}/${id}`);
  return res.data;
};
