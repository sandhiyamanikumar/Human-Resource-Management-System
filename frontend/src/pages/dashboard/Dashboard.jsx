// src/pages/dashboard/Dashboard.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ADMIN_MODULES } from "../../config/ModuleGroup";
import { VALID_MODULES } from "../../config/ValidModules";

const Dashboard = () => {
  const { user } = useAuth();
  if (!user || !user.permissions) return null;

  const modules = Object.keys(user.permissions);

  // Show only modules that have pages + user has permission
  const filteredModules = modules.filter(
    (mod) =>
      VALID_MODULES.includes(mod) && user.permissions[mod]?.includes("view")
  );

  return (
    <div className="p-3">
      <Row className="g-4">
        {filteredModules.map((mod) => {
          const finalPath = ADMIN_MODULES.includes(mod)
            ? `/admin/${mod}`
            : `/${mod}`;

          return (
            <Col key={mod} md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5>{mod.charAt(0).toUpperCase() + mod.slice(1)}</h5>
                  <p className="text-muted">Open {mod} module</p>
                  <Link to={finalPath}>Open</Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Dashboard;
