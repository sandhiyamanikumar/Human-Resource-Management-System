import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner, Card } from "react-bootstrap";
import { loginUser } from "../../api/auth.api"; // your API call
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError("");

  //     try {
  //         const res = await loginUser(formData);

  //         const userData = res.data.user;       // { name, email, role, permissions }
  //         const token = res.data.token;         // JWT token

  //         login(userData, token);               // save in context + cookie

  //         // Redirect based on role
  //         if (!userData.role) {
  //             navigate("/pending-role");

  //         } else if (userData.role === "admin") {
  //             navigate("/admin");

  //         } else if (userData.role === "hr") {
  //             navigate("/hr");
  //         } else {
  //             navigate("/employee");
  //         }
  //     } catch (err) {
  //         setError(err.response?.data?.message || "Login failed");
  //         console.log(err)
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);

      const userData = res.data.user;
      const token = res.data.token;

      login(userData, token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <Card
        className="p-4 shadow-lg border border-light rounded-4"
        style={{ width: "430px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/signup">Create Account</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
