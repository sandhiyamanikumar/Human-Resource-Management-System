import React, { useEffect, useState } from "react";
import { Table, Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { getRoles, deleteRole } from "../../../api/role.api";
import { useNavigate } from "react-router-dom";
import { PencilSquare, Trash, PlusLg } from "react-bootstrap-icons";
import { useToast } from "../../../context/ToastContext";

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await getRoles();
            setRoles(res.data);
        } catch (err) {
            console.error("Error fetching roles:", err);
            showToast("Failed to fetch roles", "danger");
        }
    };

    // Open confirmation modal
    const handleOpenModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedId(null);
        setShowModal(false);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        try {
            await deleteRole(selectedId);
            showToast("Role deleted successfully!", "success");
            fetchRoles(); // refresh table
        } catch (err) {
            console.error(err);
            showToast("Failed to delete role!", "danger");
        } finally {
            handleCloseModal();
        }
    };

    return (
        <Container className="mt-4">
            {/* Header */}
            <Row className="mb-3">
                <Col>
                    <h2 className="fw-bold text-primary">Role Management</h2>
                    <p className="text-muted">Manage application roles and permissions</p>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => navigate("/admin/role/new")}>
                        <PlusLg className="me-2" />Add New Role
                    </Button>
                </Col>
            </Row>

            {/* Roles Table */}
            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Role Name</th>
                                <th style={{ width: "180px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-muted">
                                        No roles found
                                    </td>
                                </tr>
                            ) : (
                                roles.map((role, index) => (
                                    <tr key={role._id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{role.roleName}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => navigate(`/admin/role/edit/${role._id}`)}
                                            >
                                                <PencilSquare className="me-1" />Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleOpenModal(role._id)}
                                            >
                                                <Trash className="me-1" />Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this role?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RoleList;
