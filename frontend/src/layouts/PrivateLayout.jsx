import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import { BoxArrowRight, List } from "react-bootstrap-icons";

const PrivateLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ Height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      {/* Main Content */}
      <div style={{ flex: 1, overflowX: "auto" }}>
        {/* Topbar */}
        <div
          className="bg-light px-3 ps-3 shadow-sm d-flex align-items-center justify-content-between"
          style={{ height: "60px" }}
        >
          <Button
            variant="outline-primary"
            className="d-lg-none me-2 p-1"
            onClick={() => setShowSidebar(true)}
          >
            <List size={24} />
          </Button>

          <span className="fw-semibold">Welcome, {user?.name}</span>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleLogout}
            className="fs-6"
          >
            <BoxArrowRight className="me-md-2" />
            <span className="d-none d-sm-inline">Logout</span>
          </Button>
        </div>

        {/* Page Content - Scrollable */}
        <div
          className="flex-grow-1 overflow-auto p-sm-3"
          style={{ minHeight: 0 }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
