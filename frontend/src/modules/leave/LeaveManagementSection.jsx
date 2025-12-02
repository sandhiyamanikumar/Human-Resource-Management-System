import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { Check, X, Trash } from "react-bootstrap-icons";
import {
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "../../api/leave.api";
import { useToast } from "../../context/ToastContext";

const LeaveManagementSection = () => {
  const { showToast } = useToast();
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState({ status: "" });
  const [employeeSearch, setEmployeeSearch] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves(filter);
      setLeaves(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await updateLeaveStatus(id, status);
      showToast(res.message, "success");
      fetchLeaves();
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      const res = await deleteLeave(id);
      showToast(res.message, "success");
      fetchLeaves();
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [filter]);

  // Filter leaves based on search input
  const displayedLeaves = leaves.filter((leave) =>
    leave.employeeId?.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  return (
    <div className="p-3 border rounded">
      <Row className="align-items-center mb-3">
        <Col>
          <h4>Leave Management</h4>
        </Col>
        <Col xs="auto">
          <Form>
            <Row className="g-2">
              {/* Status Filter */}
              <Col>
                <Form.Select
                  value={filter.status}
                  onChange={(e) =>
                    setFilter({ ...filter, status: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Col>

              {/* Employee Search Box */}
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search employee..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeId?.name}</td>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <div className="d-inline-flex gap-1">
                  {["pending"].includes(leave.status) && (
                    <>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() =>
                          handleStatusUpdate(leave._id, "approved")
                        }
                      >
                        <Check />
                        <span className="d-none d-sm-inline ms-1">Approve</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() =>
                          handleStatusUpdate(leave._id, "rejected")
                        }
                      >
                        <X />
                        <span className="d-none d-sm-inline ms-1">Reject</span>
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(leave._id)}
                  >
                    <Trash />
                    <span className="d-none d-sm-inline ms-1">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeaveManagementSection;
