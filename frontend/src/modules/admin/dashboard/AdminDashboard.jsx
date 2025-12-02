import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-3">
        <Outlet /> {/* renders dynamic admin modules */}
      </div>
    </div>
  );
};

export default AdminDashboard;
