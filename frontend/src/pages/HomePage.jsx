import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { PeopleFill, CalendarCheck, ClockFill, Speedometer2, FileTextFill, PersonLinesFill } from "react-bootstrap-icons";

const features = [
    { icon: <PeopleFill size={40} className="mb-2 text-primary" />, title: "Employee Profiles", desc: "Manage employee info, job details & reporting." },
    { icon: <CalendarCheck size={40} className="mb-2 text-success" />, title: "Leave Management", desc: "Apply, approve & track leave requests seamlessly." },
    { icon: <ClockFill size={40} className="mb-2 text-warning" />, title: "Attendance Tracking", desc: "Mark attendance, check in/out logs & monitor daily status." },
];

const modules = [
    { icon: <Speedometer2 size={40} className="mb-2 text-primary" />, title: "Admin Dashboard", desc: "Manage users, roles & master data.", cta: "/login/admin" },
    { icon: <FileTextFill size={40} className="mb-2 text-success" />, title: "HR Panel", desc: "Handle onboarding, attendance & documents.", cta: "/login/hr" },
    { icon: <PersonLinesFill size={40} className="mb-2 text-warning" />, title: "Employee Portal", desc: "Apply leave, mark attendance & view salary slips.", cta: "/login/employee" },
];

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="bg-primary text-white p-5">
                <Container className="text-center p-4">
                    <h1 className="fw-bold"
                    >Modern HR Management System</h1>
                    <p className="mx-auto fs-5">
                        Manage employees, leaves, attendance & permissions in one smart platform.
                    </p>
                    <Button variant="light" size="lg" href="/signup" className="mt-4">
                        Get Started
                    </Button>
                </Container>
            </div>

            {/* Core Features */}
            <Container id="features" className="py-5">
                <h2 className="text-center mb-5 fw-bold">
                    Core Features
                </h2>
                <Row className="g-4">
                    {features.map((feature, i) => (
                        <Col md={4} key={i}>
                            <Card className="shadow-sm h-100 text-center p-3 hover-card d-flex flex-column justify-content-between">
                                <div>{feature.icon}</div>
                                <Card.Body>
                                    <h5>{feature.title}</h5>
                                    <p className="text-muted">{feature.desc}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* HRMS Modules */}
            <div className="bg-light p-5">
                <Container id="modules">
                    <h2 className="text-center mb-5 fw-bold">HRMS Modules</h2>
                    <Row className="g-4">
                        {modules.map((module, i) => (
                            <Col md={4} key={i}>
                                <Card className="shadow-sm h-100 text-center p-3 hover-card d-flex flex-column justify-content-between">
                                    <div>{module.icon}</div>
                                    <Card.Body>
                                        <h5 className="fs-4">{module.title}</h5>
                                        <p className="text-muted">{module.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* CTA Section */}
            <div style={{ background: "#0A66FF", color: "white", padding: "60px 0" }}>
                <Container className="text-center">
                    <h3 style={{ fontWeight: 700 }}>Ready to Get Started?</h3>
                    <p>Create your account and manage your HR workflows efficiently.</p>
                    <Button variant="light" size="lg" href="/signup">
                        Create Account
                    </Button>
                </Container>
            </div>

            {/* Footer */}
            <footer style={{ background: "#111827", padding: "15px 0" }}>
                <p className="text-center text-white m-0" style={{ fontSize: "14px" }}>
                    © {new Date().getFullYear()} HRMS. All Rights Reserved.
                </p>
            </footer>

            {/* Hover effect style */}
            <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
        </>
    );
};

export default Home;
