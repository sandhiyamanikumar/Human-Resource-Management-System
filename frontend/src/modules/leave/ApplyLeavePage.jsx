import React from "react";
import { useNavigate } from "react-router-dom";
import ApplyLeaveSection from "./ApplyLeaveSection";

const ApplyLeavePage = () => {
  const navigate = useNavigate();

  // Function to redirect after successful submission
  const handleSuccess = () => {
    navigate("/my-leave"); 
  };

  return (
    <div className="container mt-3">
      <ApplyLeaveSection onSuccess={handleSuccess} />
    </div>
  );
};

export default ApplyLeavePage;
