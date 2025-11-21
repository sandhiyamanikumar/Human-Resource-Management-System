//  # Signup, login, verify email
import axiosInstance from "./axiosInstance.js";

export const signup = (data) => axiosInstance.post("/api/auth/signup", data);
export const loginUser = (data) => axiosInstance.post("/api/auth/signin", data);
export const verifyEmail = (id, token) => axiosInstance.get(`/api/auth/${id}/verify-email/${token}`);;
