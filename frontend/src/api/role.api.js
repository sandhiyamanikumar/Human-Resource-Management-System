import axiosInstance from "./axiosInstance.js";

const API_URL = "/api/roles";

// Get all roles

export const getRoles = async () => {
    try {
        const res = await axiosInstance.get(API_URL);
        // Return in { data: [] } format 
        return { data: Array.isArray(res.data) ? res.data : res.data.roles || [] };
    } catch (error) {
        console.error("Failed to fetch roles:", error);
        return { data: [] };
    }
};

// Create a new role
export const createRole = (data) => axiosInstance.post(API_URL, data);

// Update a role by ID
export const updateRole = (id, data) => axiosInstance.put(`${API_URL}/${id}`, data);

// Delete a role by ID
export const deleteRole = (id) => axiosInstance.delete(`${API_URL}/${id}`);

// Get role by ID
export const getRoleById = (id) => axiosInstance.get(`${API_URL}/${id}`);

// //  Assign role to a user
export const assignRole = (userId, roleId) => {
    return axiosInstance.put(`/api/users/${userId}/assign-role`, { roleId });
};
