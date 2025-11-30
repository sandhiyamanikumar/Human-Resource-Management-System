// user.api.js
import axiosInstance from "./axiosInstance";

export const getUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/api/users?${query}`);
  return res.data; // returns { users: [...], total, page, limit }
};

export const assignRole = (userId, payload) =>
  axiosInstance.put(`/api/users/${userId}/assign-role`, payload);
