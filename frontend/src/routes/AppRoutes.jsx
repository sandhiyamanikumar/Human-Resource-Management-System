import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Public pages
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";
import EmailVerifyStatus from "../modules/auth/EmailVerifyStatus";
import NotFound from "../pages/notfound/NotFound";
import PendingRole from "../pages/PendingRole";
import Home from "../pages/HomePage";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Admin modules
import RoleList from "../modules/admin/roles/RoleList";
import RoleForm from "../modules/admin/roles/RoleForm";
import AssignRole from "../modules/admin/roles/AssignRole";
import ModulesPage from "../modules/admin/modulesManagement/ModulesPage";

// Employee modules
import EmployeesPage from "../modules/employees/EmployeesManagementPage";
import MyProfilePage from "../modules/employees/MyProfilePage";

// Leave modules
import MyLeavePage from "../modules/leave/MyLeavePage";
import ApplyLeavePage from "../modules/leave/ApplyLeavePage";
import LeaveManagementPage from "../modules/leave/LeaveManagementPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/verify-email/:userId/:token"
          element={<EmailVerifyStatus />}
        />
        <Route path="/pending-role" element={<PendingRole />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Employee modules */}
        <Route path="/employee" element={<EmployeesPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />

        {/* Leave modules */}
        <Route path="/my-leave" element={<MyLeavePage />} />
        <Route path="/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/leave-management" element={<LeaveManagementPage />} />

        {/* Admin modules */}
        <Route path="/admin/role" element={<RoleList />} />
        <Route path="/admin/role/new" element={<RoleForm />} />
        <Route path="/admin/role/edit/:id" element={<RoleForm />} />
        <Route path="/admin/assign-role" element={<AssignRole />} />
        <Route path="/admin/module" element={<ModulesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
