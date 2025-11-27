const User = require("../auth/auth.model"); // Use auth.model.js
const Role = require("../role/role.model");
const sendEmail = require("../../utils/sendEmail");


// GET all users (Admin only)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("_id name email role status")
            .populate("role");

        // REMOVE ADMIN FROM LIST
        const filteredUsers = users.filter(u => u.role?.roleName !== "admin");

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
                status: "Active"
            },
            { new: true }
        ).populate("role");

        //  Send email using existing sendEmail()
        const subject = "Role Assigned - HRMS System";
        const html = `  <h3>Dear ${user.name},</h3>
                    
                        <p>We would like to inform you that your account access has been successfully updated in the HRMS Portal.</p>
                    
                        <p><strong>Assigned Role:</strong> ${role.roleName}</p>
                    
                        <p>This role grants you access to the respective modules and features based on the permissions defined by the organization.</p>
                    
                        <p>You may now log in to the HRMS system and start using the available functionalities.</p>
                    
                        <br>
                    
                        <p>If you believe this role was assigned in error or if you face any issues accessing your dashboard, please reach out to the HR or Admin team immediately.</p>
                    
                        <br>
                    
                        <p>Regards,<br>
                        <strong>HRMS Administration Team</strong></p>
                    
                        <hr>
                    
                        <p style="font-size:12px;color:#555;">
                        This is an automated notification from the HRMS system. Please do not reply to this email.
                        </p>`;

        await sendEmail(user.email, subject, html);

        res.json({
            message: "Role assigned successfully & email sent",
            user,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
