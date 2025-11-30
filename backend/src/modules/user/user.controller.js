const User = require("../auth/auth.model"); // Use auth.model.js
const Role = require("../role/role.model");
const sendEmail = require("../../utils/sendEmail");
const Employee = require("../employee/employee.model");

// // GET USERS WITH FILTERS (Admin only)
exports.getUsers = async (req, res) => {
  try {
    let { status } = req.query; // "active" | "pending" | "all"
    let filter = {};

    if (status && status.toLowerCase() !== "all") {
      // Capitalize first letter
      const formattedStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      filter.status = formattedStatus; // "Active" or "Pending"
    }

    const users = await User.find(filter)
      .select("_id name email role status")
      .populate("role");

    const filteredUsers = users.filter((u) => u.role?.roleName !== "admin");

    res.json(filteredUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGN ROLE TO USER (Admin only)
exports.assignRole = async (req, res) => {
  try {
    const { roleId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: role._id,
        status: "Active",
      },
      { new: true }
    ).populate("role");

    // Update Employee status also
    await Employee.findOneAndUpdate(
      { authUser: req.params.id },
      { status: "Active" }
    );

    //  Send email using existing sendEmail()
    const subject = "Role Assigned - HRMS System";
    const html = `
            <h3>Dear ${user.name},</h3>
            <p>Your role has been updated:</p>
            <p><strong>Role:</strong> ${role.roleName}</p>
            <p>Your account is now active.</p>
            <p>Regards, HRMS Team</p>
        `;

    await sendEmail(user.email, subject, html);

    res.json({
      message: "Role assigned successfully & email sent",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
