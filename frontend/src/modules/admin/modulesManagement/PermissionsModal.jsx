import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { getRoles, updateRole } from "../../../api/role.api";
import { useToast } from "../../../context/ToastContext";

const PermissionsModal = ({ show, onHide, module }) => {
    const [roles, setRoles] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await getRoles();
                // Initialize roles with module permissions
                const rolesWithPermissions = (res.data || []).map((role) => ({
                    ...role,
                    modulePerms: { ...(role.permissions[module.moduleName] || []) }
                }));
                setRoles(rolesWithPermissions);
            } catch (error) {
                console.error("Failed to fetch roles:", error);
                setRoles([]);
            }
        };
        if (module) fetchRoles();
    }, [module]);

    // Toggle a permission for a role
    const togglePermission = (roleId, permission) => {
        setRoles((prev) =>
            prev.map((role) => {
                if (role._id === roleId) {
                    const perms = role.permissions[module.moduleName] || [];
                    let updatedPerms;
                    if (perms.includes(permission)) {
                        updatedPerms = perms.filter((p) => p !== permission);
                    } else {
                        updatedPerms = [...perms, permission];
                    }
                    return {
                        ...role,
                        permissions: {
                            ...role.permissions,
                            [module.moduleName]: updatedPerms
                        }
                    };
                }
                return role;
            })
        );
    };

    const handleSave = async () => {
        try {
            for (const role of roles) {
                await updateRole(role._id, { permissions: role.permissions });
            }
            showToast("Permissions updated successfully!", "success");
            onHide();
        } catch (error) {
            console.error("Failed to update permissions:", error);
            showToast("Error updating permissions", "danger");
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Permissions for {module?.moduleName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>View</th>
                            <th>Create</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.length > 0 ? (
                            roles.map((role) => {
                                const perms = role.permissions[module.moduleName] || [];
                                return (
                                    <tr key={role._id}>
                                        <td>{role.roleName}</td>
                                        {["view", "create", "edit", "delete"].map((perm) => (
                                            <td key={perm}>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={perms.includes(perm)}
                                                    onChange={() => togglePermission(role._id, perm)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No roles found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Permissions
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PermissionsModal;
