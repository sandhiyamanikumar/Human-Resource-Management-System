import { useEffect, useState } from "react";
import { getMyProfile } from "../../api/employee.api";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Badge,
  Image,
} from "react-bootstrap";

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header
              as="h4"
              className="text-center text-white py-3"
              style={{
                background: "linear-gradient(90deg, #007bff, #00d4ff)",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              My Profile
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    fontSize: "36px",
                    color: "#007bff",
                  }}
                >
                  {profile.name.charAt(0)}
                </div>
              </div>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Name:
                </Col>
                <Col xs={7}>{profile.name}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Email:
                </Col>
                <Col xs={7}>{profile.email}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Department:
                </Col>
                <Col xs={7}>{profile.department || "-"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Designation:
                </Col>
                <Col xs={7}>{profile.designation || "-"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Date of Joining:
                </Col>
                <Col xs={7}>
                  {profile.dateOfJoining
                    ? new Date(profile.dateOfJoining).toLocaleDateString()
                    : "-"}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Manager:
                </Col>
                <Col xs={7}>{profile.manager || "-"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5} className="fw-bold text-muted">
                  Status:
                </Col>
                <Col xs={7}>
                  <Badge
                    pill
                    bg={profile.status === "Active" ? "success" : "secondary"}
                  >
                    {profile.status}
                  </Badge>
                </Col>
              </Row>

              <Row>
                <Col xs={5} className="fw-bold text-muted">
                  Role:
                </Col>
                <Col xs={7}>
                  <Badge pill bg="info">
                    {profile.role}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePage;
