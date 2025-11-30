import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Form, Modal } from "react-bootstrap";
import {
  getEmployees,
  deleteEmployee,
  getUnlinkedUsers,
} from "../../api/employee.api";
import EmployeeFormModal from "./EmployeeFormModal";
import { useToast } from "../../context/ToastContext";
import { getPageList } from "../../utils/Pagination";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // Modals
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Unlinked Users
  const [unlinkedUsers, setUnlinkedUsers] = useState([]);
  const [loadingUnlinked, setLoadingUnlinked] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { showToast } = useToast();

  // ---------------- Load Employees ----------------
  const loadEmployees = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit,
        search,
        status,
        department,
      };

      const response = await getEmployees(params);
      setEmployees(response.employees || []);
      setTotal(response.total || 0);
    } catch (err) {
      console.error(err);
      showToast("Failed to load employees", "danger");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUnlinkedUsers = async () => {
    try {
      setLoadingUnlinked(true);
      const users = await getUnlinkedUsers();
      setUnlinkedUsers(users || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load unlinked users", "danger");
    } finally {
      setLoadingUnlinked(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadUnlinkedUsers();
  }, [page, search, status, department, refreshTrigger]);

  // ---------------- Edit / Add ----------------
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setShowEmployeeModal(true);
  };

  const handleAddProfile = (user) => {
    setSelectedEmployee({
      authUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      name: user.name,
      email: user.email,
    });
    setShowEmployeeModal(true);
  };

  // ---------------- Delete Modal ----------------
  const handleOpenDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedId(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(selectedId);
      showToast("Employee deleted successfully", "success");
      loadEmployees();
      reloadTable();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete employee", "danger");
    } finally {
      handleCloseDeleteModal();
    }
  };

  // ---------------- Pagination Logic ----------------
  const totalPages = Math.ceil(total / limit);
  const pageList = getPageList(totalPages, page, 1, 1);
  const reloadTable = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Employees</h3>
      </div>

      {/* ---------------- Filters ---------------- */}
      <div className="d-flex overflow-auto mb-3" style={{ gap: "10px" }}>
        <div className="flex-shrink-0" style={{ minWidth: "250px" }}>
          <Form.Control
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex-shrink-0" style={{ minWidth: "200px" }}>
          <Form.Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </div>

        <div className="flex-shrink-0" style={{ minWidth: "200px" }}>
          <Form.Select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
          </Form.Select>
        </div>
      </div>

      {/* ---------------- Unlinked Users ---------------- */}
      <div className="mt-3 mb-4">
        <h5>Users Without Employee Profile</h5>

        {loadingUnlinked ? (
          <Spinner animation="border" size="sm" />
        ) : unlinkedUsers.length === 0 ? (
          <p className="text-muted">All users have employee profiles.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover responsive className="mb-4">
              <thead className="table-secondary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ width: "120px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {unlinkedUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <Button size="sm" onClick={() => handleAddProfile(u)}>
                        Add Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* ---------------- Employees Table ---------------- */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department || "-"}</td>
                    <td>{emp.designation || "-"}</td>
                    <td>{emp.authUser?.status || "Pending"}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2 mb-2 mb-sm-0"
                        onClick={() => handleEdit(emp)}
                      >
                        <PencilSquare />
                        <span className="d-none ">Edit</span>
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleOpenDeleteModal(emp._id)}
                      >
                        <Trash />
                        <span className="d-none ">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* ---------------- Pagination ---------------- */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>

          {pageList.map((p, i) => (
            <li
              key={i}
              className={`page-item ${p === page ? "active" : ""} ${
                p === "..." ? "disabled" : ""
              }`}
            >
              {p === "..." ? (
                <span className="page-link">…</span>
              ) : (
                <button className="page-link" onClick={() => setPage(p)}>
                  {p}
                </button>
              )}
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* ---------------- Employee Form Modal ---------------- */}
      <EmployeeFormModal
        show={showEmployeeModal}
        onHide={() => setShowEmployeeModal(false)}
        employee={selectedEmployee}
        refresh={reloadTable}
      />

      {/* ---------------- Delete Confirmation Modal ---------------- */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
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

export default EmployeesPage;
