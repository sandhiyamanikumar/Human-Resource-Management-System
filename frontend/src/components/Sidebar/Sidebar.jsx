import { Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { List } from "react-bootstrap-icons";
import styles from "./Sidebar.module.css";

const Sidebar = ({ show, setShow }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !user.permissions) return null;

    const modules = Object.keys(user.permissions);

    return (
        <Offcanvas
            show={show}
            onHide={() => setShow(false)}
            responsive="md"
            placement="start"
            className={`bg-dark text-white ${styles.sidebarWidth}`}
        >

            {/*  Desktop Header (visible only on md & above) */}
            <div className="d-none d-md-flex justify-content-center align-items-center py-3 border-bottom">
                <h3 className="fw-bold text-primary m-0">HRMS</h3>
            </div>

            {/* Mobile Header */}
            <Offcanvas.Header className="d-md-none d-flex justify-content-between align-items-center">
                <Offcanvas.Title className="fw-bold text-primary">
                    HRMS
                </Offcanvas.Title>

                {/* Close using hamburger (toggle) */}
                <Button
                    variant="outline-light"
                    onClick={() => setShow(false)}
                >
                    <List size={24} />
                </Button>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
                <Nav className="flex-column p-3">
                    {modules.map(mod =>
                        user.permissions[mod]?.includes("view") && (
                            <Nav.Link
                                as={Link}
                                to={`/admin/${mod}`}
                                key={mod}
                                onClick={() => setShow(false)} // close on mobile
                                className={`mb-2 d-flex align-items-center ${location.pathname.startsWith(`/admin/${mod}`)
                                    ? styles.activeItem
                                    : styles.sidebarItem
                                    }`}
                            >
                                {mod.charAt(0).toUpperCase() + mod.slice(1)}
                            </Nav.Link>
                        )
                    )}
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;
