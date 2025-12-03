import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { applyLeave } from "../../api/leave.api";
import { useToast } from "../../context/ToastContext";

const ApplyLeaveSection = ({ onSuccess }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    leaveType: "sick",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await applyLeave(formData);
      showToast(res.message, "success");

      //  Reset form
      setFormData({
        leaveType: "sick",
        startDate: "",
        endDate: "",
        reason: "",
      });

      //  Navigate to My Leaves
      if (onSuccess) onSuccess();
      
    } catch (err) {
      showToast(err.response?.data?.message || err.message, "danger");
    }
  };

  return (
    <div className="mb-4 p-3 border rounded">
      <h4>Apply Leave</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Leave Type</Form.Label>
          <Form.Select name="leaveType" onChange={handleChange}>
            <option value="sick">Sick</option>
            <option value="casual">Casual</option>
            <option value="earned">Earned</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="reason"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">Apply</Button>
      </Form>
    </div>
  );
};

export default ApplyLeaveSection;
