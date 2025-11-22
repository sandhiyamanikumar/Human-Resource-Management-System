// src/pages/notfound/NotFound.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5 text-center">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="display-4">404</h1>
                    <h3>Page Not Found</h3>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Go to Home
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
