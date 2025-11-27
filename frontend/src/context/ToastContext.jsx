import { createContext, useContext, useState } from "react";

// 1. Create Context
const ToastContext = createContext();

// 2. Create Provider
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success", // success, danger, warning, info
    });

    // Function to show toast
    const showToast = (message, variant = "success") => {
        setToast({ show: true, message, variant });
    };

    // Function to hide toast
    const hideToast = () => {
        setToast((prev) => ({ ...prev, show: false }));
    };

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

// 3. Custom hook for easier usage
export const useToast = () => useContext(ToastContext);
