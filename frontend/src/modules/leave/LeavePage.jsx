import React from "react";
import ApplyLeaveSection from "./ApplyLeaveSection";
import MyLeavesSection from "./MyLeavesSection";
import LeaveManagementSection from "./LeaveManagementSection";
import PermissionWrapper from "../../components/HasPermission";
import { useAuth } from "../../context/AuthContext";

const LeavePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-3">
      {/* Apply Leave: Only for employees */}
      {user?.role === "employee" && (
        <PermissionWrapper module="leave" permission="create">
          <ApplyLeaveSection />
        </PermissionWrapper>
      )}

      {/* My Leaves: Only for employees */}
      {user?.role === "employee" && (
        <PermissionWrapper module="leave" permission="view">
          <MyLeavesSection />
        </PermissionWrapper>
      )}

      {/* Leave Management: Only for Admin/HR */}
      <PermissionWrapper module="leave" permission="viewAll">
        <LeaveManagementSection />
      </PermissionWrapper>
    </div>
  );
};

export default LeavePage;
