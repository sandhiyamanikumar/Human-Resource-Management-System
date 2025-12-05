import { Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { List } from "react-bootstrap-icons";
import { VALID_MODULES } from "../../config/ValidModules";
import styles from "./Sidebar.module.css";

const Sidebar = ({ show, setShow }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.permissions) return null;

  // Get all modules user has permission for (view)
  let modules = Object.keys(user.permissions).filter((mod) => {
    const perms = user.permissions[mod] || [];
    const hasView = perms.includes("view") || perms.includes("view-my-profile");

    if (!hasView || !VALID_MODULES.includes(mod)) return false;

    // Special case: employee only has view-my-profile
    if (
      mod === "employee" &&
      perms.includes("view-my-profile") &&
      !perms.includes("view")
    )
      return true;

    return true;
  });

  // Only add Dashboard if user has dashboard view permission
  if (
    user.permissions.dashboard?.includes("view") &&
    !modules.includes("dashboard")
  ) {
    modules.unshift("dashboard");
  }

  // Map module to label
  const getLabelForModule = (mod) => {
    if (mod === "dashboard") return "Dashboard";
    if (mod === "employee") {
      const empPerms = user.permissions.employee || [];
      if (empPerms.includes("view-my-profile") && !empPerms.includes("view"))
        return "My Profile";
      return "Employee";
    }
    if (mod === "leave") return "Leave";
    return mod.charAt(0).toUpperCase() + mod.slice(1);
  };

  // Map module to route dynamically
  const getRouteForModule = (mod) => {
    if (mod === "dashboard") return "/dashboard";
    if (mod === "employee") {
      const empPerms = user.permissions.employee || [];
      if (empPerms.includes("view-my-profile") && !empPerms.includes("view"))
        return "/my-profile";
      return "/employee";
    }
    if (mod === "leave") {
      const leavePerms = user.permissions.leave || [];
      if (leavePerms.includes("approve") || leavePerms.includes("viewAll"))
        return "/leave-management";
      return "/my-leave";
    }
    if (user.permissions[mod]?.includes("view")) return `/admin/${mod}`;
    return `/${mod}`;
  };

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      responsive="lg"
      placement="start"
      className={`bg-dark text-white ${styles.sidebarWidth}`}
    >
      <div className="d-none d-md-flex justify-content-center align-items-center py-3 border-bottom">
        <h3 className="fw-bold text-primary m-0">HRMS</h3>
      </div>

      <Offcanvas.Header className="d-md-none d-flex justify-content-between align-items-center">
        <Offcanvas.Title className="fw-bold text-primary">HRMS</Offcanvas.Title>
        <Button variant="outline-light" onClick={() => setShow(false)}>
          <List size={24} />
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body className={`${styles.scrollContainer} p-0`}>
        <Nav className="flex-column p-3">
          {modules.map((mod) => (
            <Nav.Link
              as={Link}
              to={getRouteForModule(mod)}
              key={mod}
              onClick={() => setShow(false)}
              className={`mb-2 d-flex align-items-center ${
                location.pathname.startsWith(getRouteForModule(mod))
                  ? styles.activeItem
                  : styles.sidebarItem
              }`}
            >
              {getLabelForModule(mod)}
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
