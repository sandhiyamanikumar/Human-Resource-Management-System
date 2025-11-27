import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PendingRole = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "80vh" }}>
            <Card className="p-4 shadow-lg rounded-4 text-center" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="mb-3">Role Not Assigned</h2>
                <p className="mb-4">
                    Your account is pending role assignment. <br />
                    Please contact your administrator to get access.
                </p>
                <Button
                    variant="primary"
                    onClick={() => navigate("/login")
                    }
                    className="w-50 mx-auto d-block"
                >
                    Back to Login
                </Button>
            </Card>
        </Container>
    );
};

export default PendingRole;
