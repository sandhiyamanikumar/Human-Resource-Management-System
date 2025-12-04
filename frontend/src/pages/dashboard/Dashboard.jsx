import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SummaryCards from "../../components/dashboard/SummaryCards";
import SummaryCharts from "../../components/dashboard/SummaryCharts";
import EmployeeDepartmentChart from "../../components/dashboard/EmployeeDepartmentChart";
import LeavesOverviewChart from "../../components/dashboard/LeavesOverviewChart";
import RolesDistributionChart from "../../components/dashboard/RolesDistributionChart";

const Dashboard = () => {
  return (
    <Container fluid className="p-3">
      {/* Header */}
      <h3 className="mb-4">HRMS Dashboard</h3>

      {/* Row 1: Summary Cards */}
      <Row className="mb-4">
        <Col>
          <SummaryCards />
        </Col>
      </Row>

      {/* Row 2: Summary Charts */}
      <Row className="mb-4">
        <Col></Col>
      </Row>

      {/* Row 3: Two charts side by side */}
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <SummaryCharts />
        </Col>
        <Col md={6} className="mb-4">
          <EmployeeDepartmentChart />
        </Col>
      </Row>

      {/* Row 4: Two charts side by side */}
      <Row className="mb-4">
        <Col md={5} className="mb-4">
          <LeavesOverviewChart />
        </Col>
        <Col md={7} className="mb-4">
          <RolesDistributionChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
