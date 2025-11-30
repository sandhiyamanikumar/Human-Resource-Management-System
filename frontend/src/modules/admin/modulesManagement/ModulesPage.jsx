import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import { getModules, deleteModule } from "../../../api/module.api";
import ModuleFormModal from "./ModuleFormModal";
import PermissionsModal from "./PermissionsModal";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const data = await getModules();
      setModules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      setModules([]);
    }
    setLoading(false);
  };

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteModule(selectedId);
      await fetchModules();
      showToast("Module deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete module!", "danger");
    } finally {
      handleCloseModal();
    }
  };

  const handleEdit = (module) => {
    setEditingModule(module);
    setShowModuleModal(true);
  };

  const handlePermissions = (module) => {
    setSelectedModule(module);
    setShowPermissionsModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Modules</h2>
        <Button onClick={() => setShowModuleModal(true)}>+ Add Module</Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(modules) && modules.length > 0 ? (
                modules.map((mod) => (
                  <tr key={mod._id}>
                    <td>{mod.moduleName}</td>
                    <td>{mod.description || "-"}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-1 mb-2 mb-md-0"
                        onClick={() => handleEdit(mod)}
                      >
                        <PencilSquare className="me-1" />
                        <span className="d-none d-lg-inline">Edit</span>
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-1 mb-2 mb-md-0"
                        onClick={() => handleOpenModal(mod._id)}
                      >
                        <Trash className="me-1" />
                        <span className="d-none d-lg-inline">Delete</span>
                      </Button>{" "}
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-1 mb-2 mb-sm-0"
                        onClick={() => handlePermissions(mod)}
                      >
                        Permissions
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No modules available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {showModuleModal && (
        <ModuleFormModal
          show={showModuleModal}
          onHide={() => {
            setShowModuleModal(false);
            setEditingModule(null);
          }}
          module={editingModule}
          refreshModules={fetchModules}
        />
      )}

      {showPermissionsModal && (
        <PermissionsModal
          show={showPermissionsModal}
          onHide={() => {
            setShowPermissionsModal(false);
            setSelectedModule(null);
          }}
          module={selectedModule}
        />
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this module?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModulesPage;
