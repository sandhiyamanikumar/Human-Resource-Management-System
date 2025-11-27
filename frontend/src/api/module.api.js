import axiosInstance from "./axiosInstance.js";

const API_URL = "/api/modules";

export const getModules = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        // Return the array directly, fallback to empty array
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching modules:", error);
        return [];
    }
};

export const createModule = async (data) => {
    const res = await axiosInstance.post(API_URL, data);
    return res.data;
};

export const updateModule = async (id, data) => {
    const res = await axiosInstance.put(`${API_URL}/${id}`, data);
    return res.data;
};

export const deleteModule = async (id) => {
    const res = await axiosInstance.delete(`${API_URL}/${id}`);
    return res.data;
};
