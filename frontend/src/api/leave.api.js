import axiosInstance from "./axiosInstance";

const API_URL = "/api/leaves";

// Employee APIs
export const applyLeave = (data) =>
  axiosInstance.post(`${API_URL}/apply`, data).then((res) => res.data);

export const getMyLeaves = () =>
  axiosInstance.get(`${API_URL}/my-leaves`).then((res) => res.data);

export const cancelLeave = (id) =>
  axiosInstance.put(`${API_URL}/cancel/${id}`).then((res) => res.data);

// // Admin/HR APIs
// export const getAllLeaves = () =>
//   axiosInstance.get(`${API_URL}`).then((res) => res.data);

// Admin/HR APIs
export const getAllLeaves = (filter = {}) =>
  axiosInstance
    .get(`${API_URL}`, { params: filter }) // <-- send filter as query params
    .then((res) => res.data);

export const updateLeaveStatus = (id, statusValue) =>
  axiosInstance
    .put(`${API_URL}/status/${id}`, { status: statusValue }) // statusValue must be a string
    .then((res) => res.data);

export const deleteLeave = (id) =>
  axiosInstance.delete(`${API_URL}/${id}`).then((res) => res.data);
