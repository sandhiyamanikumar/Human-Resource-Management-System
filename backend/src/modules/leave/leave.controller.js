// import Leave from "./leave.model.js";

// // ==================================================
// // APPLY LEAVE (EMPLOYEE)
// // ==================================================
// export const applyLeave = async (req, res) => {
//   try {
//     const leave = await Leave.create({
//       ...req.body,
//       employeeId: req.user.id,
//       status: "pending",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Leave applied successfully",
//       data: leave,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================================================
// // GET ALL LEAVES (ADMIN / HR)
// // ==================================================
// export const getAllLeaves = async (req, res) => {
//   try {
//     const filter = {};

//     if (req.query.employeeId) filter.employeeId = req.query.employeeId;
//     if (req.query.status) filter.status = req.query.status;

//     const leaves = await Leave.find(filter).populate("employeeId");

//     res.json({ success: true, data: leaves });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================================================
// // APPROVE / REJECT LEAVE (ADMIN / HR)
// // ==================================================
// export const updateLeaveStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid status" });
//     }

//     const leave = await Leave.findById(req.params.id);

//     if (!leave) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Leave not found" });
//     }

//     if (leave.status === "cancelled") {
//       return res.json({
//         success: false,
//         message: "Cancelled leave cannot be updated",
//       });
//     }

//     leave.status = status;
//     leave.approvedBy = req.user.id;

//     await leave.save();

//     res.json({
//       success: true,
//       message: "Status updated",
//       data: leave,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================================================
// // GET LOGGED-IN EMPLOYEE LEAVES
// // ==================================================
// export const getMyLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find({ employeeId: req.user.id });

//     res.json({ success: true, data: leaves });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================================================
// // CANCEL LEAVE (Employee)
// // ==================================================
// export const cancelLeave = async (req, res) => {
//   try {
//     const leave = await Leave.findById(req.params.id);

//     if (!leave) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Leave not found" });
//     }

//     if (leave.employeeId.toString() !== req.user.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You cannot cancel someone else's leave",
//       });
//     }

//     if (["approved", "rejected"].includes(leave.status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Approved/Rejected leave cannot be cancelled",
//       });
//     }

//     leave.status = "cancelled";
//     await leave.save();

//     res.json({
//       success: true,
//       message: "Leave cancelled successfully",
//       data: leave,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ==================================================
// // DELETE LEAVE (Admin / HR)
// // ==================================================
// export const deleteLeave = async (req, res) => {
//   try {
//     const leave = await Leave.findByIdAndDelete(req.params.id);

//     if (!leave) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Leave not found" });
//     }

//     res.json({
//       success: true,
//       message: "Leave deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import Leave from "./leave.model.js";

// ==================================================
// APPLY LEAVE (EMPLOYEE)
// ==================================================
export const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      employeeId: req.user.id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================================================
// GET ALL LEAVES (ADMIN / HR) WITH FILTER
// ==================================================
export const getAllLeaves = async (req, res) => {
  try {
    const filter = {};

    // Only add to filter if value is present
    if (req.query.employeeId) filter.employeeId = req.query.employeeId;
    if (req.query.status) filter.status = req.query.status;

    const leaves = await Leave.find(filter).populate("employeeId");

    res.json({ success: true, data: leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================================================
// APPROVE / REJECT LEAVE (ADMIN / HR)
// ==================================================
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status value
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }

    if (leave.status === "cancelled") {
      return res.json({
        success: false,
        message: "Cancelled leave cannot be updated",
      });
    }

    // Update status and record who approved/rejected
    leave.status = status;
    leave.approvedBy = req.user.id;

    await leave.save();

    res.json({
      success: true,
      message: `Leave ${status} successfully`,
      data: leave,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================================================
// GET LOGGED-IN EMPLOYEE LEAVES
// ==================================================
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });

    res.json({ success: true, data: leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================================================
// CANCEL LEAVE (Employee)
// ==================================================
export const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }

    if (leave.employeeId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot cancel someone else's leave",
      });
    }

    if (["approved", "rejected"].includes(leave.status)) {
      return res.status(400).json({
        success: false,
        message: "Approved/Rejected leave cannot be cancelled",
      });
    }

    leave.status = "cancelled";
    await leave.save();

    res.json({
      success: true,
      message: "Leave cancelled successfully",
      data: leave,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================================================
// DELETE LEAVE (Admin / HR)
// ==================================================
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }

    res.json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
