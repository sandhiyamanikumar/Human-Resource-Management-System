import React, { useEffect, useState } from "react";
import { Table, Form, Button, Card } from "react-bootstrap";
import { getUsers, assignRole } from "../../../api/user.api";
import { getRoles } from "../../../api/role.api";
import { useToast } from "../../../context/ToastContext";
import styles from "./Role.module.css";

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const { showToast } = useToast();

  // Fetch roles on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Fetch users whenever filter changes
  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers({ status: statusFilter }); 
      setUsers(response || []); // assign users array
    } catch (err) {
      console.error("Fetch users error:", err);
      showToast("Failed to load users", "danger");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data || []); // assign roles array
    } catch (err) {
      console.error("Fetch roles error:", err);
      showToast("Failed to load roles", "danger");
    }
  };

  const handleAssign = async (userId) => {
    const roleId = selectedRole[userId];
    if (!roleId) {
      showToast("Please select a role", "warning");
      return;
    }

    try {
      await assignRole(userId, { roleId });
      showToast("Role assigned successfully!", "success");
      fetchUsers(); // refresh table after assign
    } catch (err) {
      console.error("Assign error:", err);
      showToast("Failed to assign role", "danger");
    }
  };

  return (
    <div className="mx-md-auto mx-3 my-4" style={{ maxWidth: "1000px" }}>
      <div className="d-flex align-items-center mb-3 justify-content-between">
        <h3>Assign Role</h3>
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
        </Form.Select>
      </div>

      <Card className={`shadow-sm ${styles.fixedTableContainer} m-0 p-0`}>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Assign Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.roleName || "No role"}</td>
                  <td>
                    <Form.Select
                      value={selectedRole[user._id] || ""}
                      onChange={(e) =>
                        setSelectedRole({
                          ...selectedRole,
                          [user._id]: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Select --</option>
                      {roles.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.roleName}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "text-success fw-semibold"
                          : "text-warning fw-semibold"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAssign(user._id)}
                    >
                      {user.role ? "Update" : "Assign"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AssignRole;
