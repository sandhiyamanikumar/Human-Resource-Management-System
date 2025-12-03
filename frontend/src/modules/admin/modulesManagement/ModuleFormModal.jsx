import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createModule, updateModule } from "../../../api/module.api";

const ModuleFormModal = ({ show, onHide, module, refreshModules }) => {
    const [moduleName, setModuleName] = useState("");
    const [description, setDescription] = useState("");
    const [permissions, setPermissions] = useState([]);
    const allPermissions = ["view", "create", "edit", "delete", "approve", "reject", "cancel", "viewAll", "view-my-profile"];

    useEffect(() => {
        if (module) {
            setModuleName(module.moduleName || "");
            setDescription(module.description || "");
            setPermissions(module.permissions || []);
        } else {
            setModuleName("");
            setDescription("");
            setPermissions([]);
        }
    }, [module]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!moduleName.trim()) return;

        try {
            if (module) {
                await updateModule(module._id, { moduleName, description, permissions });
            } else {
                await createModule({ moduleName, description, permissions });
            }
            refreshModules();
            onHide();
        } catch (error) {
            console.error("Error saving module:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{module ? "Edit Module" : "Add Module"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Module Name</Form.Label>
                        <Form.Control
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter module description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Permissions</Form.Label>
                        <div>
                            {allPermissions.map((perm) => (
                                <Form.Check
                                    inline
                                    key={perm}
                                    label={perm}
                                    type="checkbox"
                                    checked={permissions.includes(perm)}
                                    onChange={() => {
                                        if (permissions.includes(perm)) {
                                            setPermissions(permissions.filter(p => p !== perm));
                                        } else {
                                            setPermissions([...permissions, perm]);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <Button type="submit">{module ? "Update" : "Create"}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModuleFormModal;
