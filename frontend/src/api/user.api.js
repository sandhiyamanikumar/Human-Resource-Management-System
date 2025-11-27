import axiosInstance from "./axiosInstance.js";

export const getUsers = () => axiosInstance.get("/api/users");
export const assignRole = (userId, payload) => axiosInstance.put(`/api/users/${userId}/assign-role`, payload);