import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Public pages
import Home from "../pages/HomePage";
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";
import EmailVerifyStatus from "../modules/auth/EmailVerifyStatus";
import NotFound from "../pages/notfound/NotFound";
import PendingRole from "../pages/PendingRole";

import AdminDashboard from "../modules/admin/dashboard/AdminDashboard";
import RoleList from "../modules/admin/roles/RoleList";
import RoleForm from "../modules/admin/roles/RoleForm";
import AssignRole from "../modules/admin/roles/AssignRole";
import ModulesPage from "../modules/admin/modulesManagement/ModulesPage";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email/:userId/:token" element={<EmailVerifyStatus />} />
                <Route path="/pending-role" element={<PendingRole />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateLayout />}>
                <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<p>Welcome Admin</p>} />
                    <Route path="role" element={<RoleList />} />             
                    <Route path="role/new" element={<RoleForm />} />         
                    <Route path="role/edit/:id" element={<RoleForm />} />    
                    <Route path="assign-role" element={<AssignRole />} />
                    <Route path="employee" element={<p>Employee Module</p>} />
                    <Route path="leave" element={<p>Leave Module</p>} />
                    <Route path="attendance" element={<p>Attendance Module</p>} />
                    <Route path="hr" element={<p>HR Module</p>} />
                    <Route path="/admin/module" element={<ModulesPage />} /> 
                </Route>
            </Route>

        </Routes>
    );
};

export default AppRoutes;
