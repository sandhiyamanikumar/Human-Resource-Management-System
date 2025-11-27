import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Form,
    Button,
    Row,
    Col,
    Collapse,
} from "react-bootstrap";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";

import { getModules } from "../../../api/module.api";
import { createRole, getRoleById, updateRole } from "../../../api/role.api";
import { useToast } from "../../../context/ToastContext";

const RoleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roleName, setRoleName] = useState("");
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [openModules, setOpenModules] = useState({});
    const { showToast } = useToast();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const res = await getModules();
                setModules(res || []);
            } catch (err) {
                console.error("Error fetching modules:", err);
            }
        };

        const fetchRole = async () => {
            if (id) {
                try {
                    const res = await getRoleById(id);
                    setRoleName(res.data.roleName);
                    setPermissions(res.data.permissions || {});
                } catch (err) {
                    console.error("Error fetching role:", err);
                }
            }
        };

        fetchModules();
        fetchRole();
    }, [id]);

    const toggleModule = (moduleName) => {
        setOpenModules((prev) => ({
            ...prev,
            [moduleName]: !prev[moduleName],
        }));
    };

    const handlePermissionChange = (moduleName, permission, checked) => {
        setPermissions((prev) => {
            const modulePerms = prev[moduleName] || [];
            const updated = checked
                ? [...modulePerms, permission]
                : modulePerms.filter((p) => p !== permission);

            return { ...prev, [moduleName]: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { roleName, permissions };
        try {
            if (id) {
                await updateRole(id, payload);
                showToast("Role updated successfully!", "success");
            } else {
                await createRole(payload);
                showToast("Role created successfully!", "success");
            }
            navigate("/admin/role");
        } catch (err) {
            console.error("Error saving role:", err);
            showToast("Failed to save role", "danger");
        }
    };

    return (
        <Container className="mt-sm-4 m-0 p-0" style={{ maxWidth: "900px" }}>
            <Card className="shadow-sm p-4">
                <h3 className="fw-bold mb-4">{id ? "Edit Role" : "Add Role"}</h3>

                <Form onSubmit={handleSubmit}>
                    {/* Role Name */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Role Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter role name"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Permissions */}
                    <h5 className="fw-semibold mb-3">Module Permissions</h5>

                    <div className="module-permissions-list">
                        {(modules || []).map((mod) => {
                            const isOpen = openModules[mod.moduleName] || false;
                            return (
                                <Card key={mod._id} className="mb-3 shadow-sm">
                                    <Card.Header
                                        className="d-flex align-items-center px-3 py-2"
                                        onClick={() => toggleModule(mod.moduleName)}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: "#f8f9fa", // light gray
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                                    >
                                        {/* Icon + Module Name + Description */}
                                        {isOpen ? (
                                            <ChevronDown className="me-2 text-primary" />
                                        ) : (
                                            <ChevronRight className="me-2 text-secondary" />
                                        )}
                                        <span className="fw-semibold text-capitalize">{mod.moduleName}</span>
                                        {mod.description && (
                                            <small className="text-muted ms-2">{mod.description}</small>
                                        )}
                                    </Card.Header>
                                    <Collapse in={isOpen}>
                                        <Card.Body>
                                            <Row>
                                                {(mod.permissions || []).map((perm) => (
                                                    <Col xs={6} md={3} key={perm} className="mb-2">
                                                        <Form.Check
                                                            type="checkbox"
                                                            label={<span className="text-capitalize">{perm}</span>}
                                                            checked={permissions[mod.moduleName]?.includes(perm) || false}
                                                            onChange={(e) =>
                                                                handlePermissionChange(mod.moduleName, perm, e.target.checked)
                                                            }
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Card.Body>
                                    </Collapse>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 text-end">
                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={() => navigate("/admin/role")}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {id ? "Update Role" : "Create Role"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default RoleForm;
