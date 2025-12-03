import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Public pages
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";
import EmailVerifyStatus from "../modules/auth/EmailVerifyStatus";
import NotFound from "../pages/notfound/NotFound";
import PendingRole from "../pages/PendingRole";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Admin
import AdminDashboard from "../modules/admin/dashboard/AdminDashboard";
import RoleList from "../modules/admin/roles/RoleList";
import RoleForm from "../modules/admin/roles/RoleForm";
import AssignRole from "../modules/admin/roles/AssignRole";
import ModulesPage from "../modules/admin/modulesManagement/ModulesPage";

// Employee
import EmployeesPage from "../modules/employees/EmployeesManagementPage";
import MyProfilePage from "../modules/employees/MyProfilePage";

// Leave
import MyLeavePage from "../modules/leave/MyLeavePage";
import ApplyLeavePage from "../modules/leave/ApplyLeavePage";
import LeaveManagementPage from "../modules/leave/LeaveManagementPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
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
        <Route path="/" element={<Dashboard />} />

        {/* Employee modules */}
        <Route path="/employee" element={<EmployeesPage />} />

        {/* ⭐ Employee self-profile page */}
        <Route path="/my-profile" element={<MyProfilePage />} />

        {/* Leave modules */}
        <Route path="/my-leave" element={<MyLeavePage />} />
        <Route path="/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/leave-management" element={<LeaveManagementPage />} />

        {/* Admin modules */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<p>Welcome Admin</p>} />
          <Route path="role" element={<RoleList />} />
          <Route path="role/new" element={<RoleForm />} />
          <Route path="role/edit/:id" element={<RoleForm />} />
          <Route path="assign-role" element={<AssignRole />} />
          <Route path="module" element={<ModulesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
