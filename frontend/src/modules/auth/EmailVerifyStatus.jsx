import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { CheckCircleFill, XCircleFill, ExclamationTriangleFill } from "react-bootstrap-icons";

const EmailVerifyStatus = () => {
    const { userId, token } = useParams();
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Smooth loader for 1 sec
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 mb-0 fw-semibold">Verifying your email...</p>
                </div>
            );
        }

        // SUCCESS
        if (status === "success") {
            return (
                <>
                    <CheckCircleFill size={80} className="text-success mx-auto mb-3" />
                    <h3 className="fw-bold text-primary">Email Verified Successfully</h3>
                    <p>Your email address has been verified. You can now log in.</p>

                    <Button href="/login" variant="primary" className="mt-3 w-50 mx-auto">
                        Proceed to Login
                    </Button>
                </>
            );
        }

        // ALREADY VERIFIED
        if (status === "already") {
            return (
                <>
                    <CheckCircleFill size={80} className="text-success mx-auto mb-3" />
                    <h3 className="fw-bold text-primary">Email Already Verified</h3>
                    <p>You have already verified your email. Please log in.</p>

                    <Button href="/login" variant="primary" className="mt-3 w-50 mx-auto">
                        Go to Login
                    </Button>
                </>
            );
        }

        // EXPIRED
        if (status === "expired") {
            return (
                <>
                    <ExclamationTriangleFill size={80} className="text-warning mx-auto mb-3" />
                    <h3 className="fw-bold text-warning">Verification Link Expired</h3>
                    <p>Your verification link has expired. Please request a new one.</p>

                    <Button variant="warning" className="mt-3 w-75 mx-auto" disabled>
                        Resend Verification Email
                    </Button>
                </>
            );
        }

        // INVALID LINK
        return (
            <>
                <XCircleFill size={80} className="text-danger mx-auto mb-3" />
                <h3 className="fw-bold text-danger">Invalid Verification Link</h3>
                <p>The link you used is invalid or corrupted.</p>

                <Button href="/signup" variant="danger" className="mt-3 w-50 mx-auto">
                    Back to Signup
                </Button>
            </>
        );
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Row className="justify-content-center w-100">
                <Col md={5}>
                    <Card className="p-4 text-center shadow-lg" style={{ borderRadius: "14px" }}>
                        {renderContent()}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EmailVerifyStatus;
