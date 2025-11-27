import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import { signup } from "../../api/auth.api";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        orgId: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trimStart() });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        if (!formData.name || !formData.email || !formData.password || !formData.orgId) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Invalid email format");
            setLoading(false);
            return;
        }

        if (!validatePassword(formData.password)) {
            setError(
                "Password must be at least 6 characters, include 1 uppercase, 1 lowercase, and 1 special character"
            );
            setLoading(false);
            return;
        }

        try {
            const dataToSend = { ...formData }
            const response = await signup(dataToSend);

            setMessage(response.data.message || "Signup successful! Please verify your email.");

            setFormData({ name: "", email: "", password: "", orgId: "" });

            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center py-3 h-100vh">
            <Card className="p-4 shadow-lg border border-light rounded-4" style={{ width: "450px" }}>
                <h2 className="text-center mb-4">Create Account</h2>

                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter a strong password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Must contain uppercase, lowercase & special character.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="orgId">
                        <Form.Label>Organization ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Organization ID"
                            name="orgId"
                            value={formData.orgId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading} className="w-100">
                        {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                    </Button>

                    <div className="text-center mt-3">
                        <span>Already have an account? </span>
                        <Link to="/login"
                        >Login</Link>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Signup;
