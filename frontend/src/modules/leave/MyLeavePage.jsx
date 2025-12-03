import React from "react";
import MyLeavesSection from "./MyLeavesSection";
import { Link } from "react-router-dom";

const MyLeavePage = () => {
  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Leaves</h3>
        <Link to="/apply-leave" className="btn btn-primary">
          Apply Leave
        </Link>
      </div>

      <MyLeavesSection />
    </div>
  );
};

export default MyLeavePage;
