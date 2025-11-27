import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Sidebar.module.css"; // CSS Module

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !user.permissions) return null;

    const modules = Object.keys(user.permissions);

    return (
        <div className="d-flex flex-column vh-100 p-3 bg-dark" style={{ width: "220px" }}>
            <h4 className="text-center mb-4 fw-bold" style={{ color: "#0d6efd" }}>
                HRMS
            </h4>

            <Nav className="flex-column">
                {modules.map(
                    (mod) =>
                        user.permissions[mod]?.includes("view") && (
                            <Nav.Link
                                as={Link}
                                to={`/admin/${mod}`}
                                key={mod}
                                className={`mb-2 d-flex align-items-center ${location.pathname === `/admin/${mod}` ? styles.activeItem : styles.sidebarItem
                                    }`}
                            >
                                {mod.charAt(0).toUpperCase() + mod.slice(1)}
                            </Nav.Link>
                        )
                )}
            </Nav>
        </div>
    );
};

export default Sidebar;
