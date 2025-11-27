import React, { useEffect, useState } from "react";
import { Table, Form, Button,Card } from "react-bootstrap";
import { getUsers, assignRole } from "../../../api/user.api";
import { getRoles } from "../../../api/role.api";
import { useToast } from "../../../context/ToastContext";
import styles from "./Role.module.css";

const AssignRole = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const { showToast } = useToast();

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
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
            fetchUsers();
        } catch (error) {
            console.error("Assign error:", error);
            showToast("Failed to assign role", "danger");
        }
    };

    return (
        <div className="mx-auto" style={{ maxWidth: '900px' }}>
            <h3>Assign Role</h3>

            <Card className={`shadow-sm ${styles.fixedTableContainer} m-0 p-0`}>
                <Card.Body>
                    {/*  Horizontal scroll wrapper */}
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
        </div >
    );
};

export default AssignRole;
