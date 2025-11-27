import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user info (name, email, role)
    const [permissions, setPermissions] = useState([]); // user permissions
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage on page load
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedPermissions = localStorage.getItem("permissions");

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedPermissions) setPermissions(JSON.parse(savedPermissions));

        setLoading(false);
    }, []);

    // Login function
    const login = (userData, token) => {
        setUser(userData);
        setPermissions(userData.permissions || []);

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("permissions", JSON.stringify(userData.permissions || []));

        // Save token in cookie (expires in 1 day)
        document.cookie = `token=${token}; path=/; max-age=86400`;

        // Set default axios header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setPermissions([]);
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
        document.cookie = "token=; path=/; max-age=0"; // remove cookie
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, permissions, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
