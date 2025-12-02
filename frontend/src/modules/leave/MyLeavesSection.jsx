import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getMyLeaves, cancelLeave } from "../../api/leave.api";
import { useToast } from "../../context/ToastContext";

const MyLeavesSection = () => {
  const { showToast } = useToast();
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await getMyLeaves();
      setLeaves(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this leave?")) return;
    try {
      const res = await cancelLeave(id);
      showToast(res.message, "success");
      fetchLeaves();
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-3 border rounded">
      <h4>My Leaves</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "pending" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancel(leave._id)}
                  >
                    Cancel
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyLeavesSection;
