import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import { BoxArrowRight } from 'react-bootstrap-icons';

const PrivateLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();           // clear user from context and localStorage
        navigate("/login"); // redirect to login page
    };

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Top bar */}
                <div
                    className="bg-light p-3 shadow-sm d-flex justify-content-between align-items-center"
                    style={{ height: "60px" }}
                >
                    <span>Welcome, {user?.name}</span>
                    <Button variant="outline-danger" size="sm" onClick={handleLogout} className="fs-6">
                         <BoxArrowRight className="me-2" />Logout
                    </Button>
                </div>

                {/* Page content */}
                <div className="flex-grow-1 overflow-auto p-3">
                    <Outlet /> {/* This renders AdminDashboard, HRDashboard, etc. */}
                </div>
            </div>
        </div>
    );
};

export default PrivateLayout;
