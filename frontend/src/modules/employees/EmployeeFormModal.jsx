import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createEmployee, updateEmployee } from "../../api/employee.api";
import { useToast } from "../../context/ToastContext";

const EmployeeFormModal = ({ show, onHide, employee, refresh }) => {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    authUserId: "",
    authUserName: "",
    authUserEmail: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    manager: "",
  });

  // Load data when editing OR adding from unlinked users
  useEffect(() => {
    if (employee) {
      setForm({
        authUserId: employee.authUser?._id || "",
        authUserName: employee.authUser?.name || "",
        authUserEmail: employee.authUser?.email || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        designation: employee.designation || "",
        dateOfJoining: employee.dateOfJoining?.split("T")[0] || "",
        manager: employee.manager || "",
      });
    } else {
      setForm({
        authUserId: "",
        authUserName: "",
        authUserEmail: "",
        name: "",
        email: "",
        department: "",
        designation: "",
        dateOfJoining: "",
        manager: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let res;

      if (employee?._id) {
        res = await updateEmployee(employee._id, form);
      } else {
        res = await createEmployee(form);
      }

      if (res.status === 201 || res.status === 200) {
        // SHOW SUCCESS
        showToast(
          employee?._id ? "Employee updated!" : "Employee created!",
          "success"
        );

        // CLOSE MODAL AFTER A VERY SMALL DELAY
        setTimeout(() => {
          onHide();
          refresh(); // Reload table
        });

        return;
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to save employee", "danger");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {employee?._id ? "Edit Employee" : "Add Employee"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* SHOW THIS WHEN COMING FROM UNLINKED USERS */}
          {form.authUserId ? (
            <div className="mb-3 p-2 border rounded">
              <strong>Linked User</strong>
              <p className="mb-1">
                <b>Name:</b> {form.authUserName}
              </p>
              <p className="mb-1">
                <b>Email:</b> {form.authUserEmail}
              </p>

              {/* Hidden ID field */}
              <Form.Control
                type="hidden"
                name="authUserId"
                value={form.authUserId}
              />
            </div>
          ) : (
            // SHOW THIS WHEN MANUALLY ADDING EMPLOYEE
            <Form.Group className="mb-3">
              <Form.Label>Auth User ID</Form.Label>
              <Form.Control
                type="text"
                name="authUserId"
                value={form.authUserId}
                onChange={handleChange}
                placeholder="Enter Auth user ID"
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="date"
              name="dateOfJoining"
              value={form.dateOfJoining}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Manager</Form.Label>
            <Form.Control
              type="text"
              name="manager"
              value={form.manager}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeFormModal;
