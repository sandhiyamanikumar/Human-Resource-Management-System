import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import useScrollToSection from "../utils/useScrollToSection";

const AppNavbar = () => {
  const goToSection = useScrollToSection();

  return (
    <Navbar bg="light" expand="md" className="shadow-lg py-2 sticky-top">
      <Container>
        <Navbar.Brand href="/" className="text-primary fs-4 fw-bold">
          HRMS
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="w-75"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel"
              className="text-primary fw-bold"
            >
              HRMS
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto gap-4 ">
              <Nav.Link onClick={() => goToSection("features")}>
                Features
              </Nav.Link>
              <Nav.Link onClick={() => goToSection("modules")}>
                Modules
              </Nav.Link>
              <Button as={Link} to="/login" variant="primary" className="px-3">
                Login
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
