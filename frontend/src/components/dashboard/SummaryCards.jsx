import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import {
  PeopleFill,
  PersonCheckFill,
  PersonXFill,
  ClipboardDataFill,
  CheckCircleFill,
  ShieldFill,
} from "react-bootstrap-icons";
import {
  fetchEmployeeStats,
  fetchLeaveStats,
  fetchRolesDistribution,
} from "../../api/dashboardService.api";

const SummaryCards = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [empStats, leaveStats, rolesDist] = await Promise.all([
        fetchEmployeeStats(),
        fetchLeaveStats(),
        fetchRolesDistribution(),
      ]);
      setData({
        employees: empStats.data,
        leaves: leaveStats.data,
        roles: rolesDist.data,
      });
    };
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  const cardItems = [
    {
      title: "Total Employees",
      value: data.employees.totalEmployees,
      icon: <PeopleFill size={30} />
    },
    {
      title: "Active Employees",
      value: data.employees.activeEmployees,
      icon: <PersonCheckFill size={30} />
    },
    {
      title: "Pending Employees",
      value: data.employees.pendingEmployees,
      icon: <PersonXFill size={30} />
    },
    {
      title: "Leaves Pending",
      value: data.leaves.pending,
      icon: <ClipboardDataFill size={30} />
    },
    {
      title: "Leaves Approved",
      value: data.leaves.approved,
      icon: <CheckCircleFill size={30} />
    },
    {
      title: "Roles",
      value: data.roles.length,
      icon: <ShieldFill size={30} />
    },
  ];

  return (
    <Row className="g-3">
      {cardItems.map((item) => (
        <Col key={item.title} xs={12} sm={6} md={4} lg={2}>
          <Card
             className="summary-card shadow-lg h-100 border-0 text-white bg-primary rounded-4"
          >
            <Card.Body className="d-flex flex-column justify-content-center align-items-center py-3">
              <div className="mb-1">{item.icon}</div>
              <Card.Title className="text-center fs-6">
                {item.title}
              </Card.Title>
              <Card.Text className="display-8 fw-bold">{item.value}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;
