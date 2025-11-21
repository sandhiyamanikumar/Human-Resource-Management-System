import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Public pages
import Home from "../pages/HomePage";
import Login from "../modules/auth/Login";
import Signup from "../modules/auth/Signup";
import EmailVerifyStatus from "../modules/auth/EmailVerifyStatus";
import NotFound from "../pages/notfound/NotFound";

// Private pages
import AdminDashboard from "../modules/admin/AdminDashboard";
import HRDashboard from "../modules/hr/HrDashboard";
import EmployeeDashboard from "../modules/employee/EmployeeDashboard";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email/:userId/:token" element={<EmailVerifyStatus />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateLayout />}>
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/hr/*" element={<HRDashboard />} />
                <Route path="/employee/*" element={<EmployeeDashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
