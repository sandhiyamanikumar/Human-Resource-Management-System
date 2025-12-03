const Employee = require("./employee.model");
const Auth = require("../auth/auth.model");

exports.getEmployeeDashboard = async (req, res) => {
  res.json({ message: "Employee dashboard data" });
};

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      authUserId,
      department,
      designation,
      dateOfJoining,
      manager,
      name,
    } = req.body;

    // Get Auth user
    const authUser = await Auth.findById(authUserId);
    if (!authUser)
      return res.status(404).json({ message: "User not found in Auth model" });

    // Prevent duplicate employee
    const existingEmployee = await Employee.findOne({ authUser: authUserId });
    if (existingEmployee)
      return res
        .status(400)
        .json({ message: "Employee profile already exists" });

    // Create employee (status NOT stored here)
    const employee = await Employee.create({
      authUser: authUser._id,
      name: name || authUser.name,
      email: authUser.email,
      orgId: authUser.orgId,
      department,
      designation,
      dateOfJoining,
      manager,
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees (with search, status, department filters)
exports.getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      department = "",
    } = req.query;

    let filter = {};

    if (department) filter.department = department;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Count total before pagination
    const total = await Employee.countDocuments(filter);

    // Now fetch page data
    const employees = await Employee.find(filter)
      .populate({
        path: "authUser",
        select: "name email role status",
        match: status ? { status } : {},
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Keep only employees whose authUser matched
    const finalEmployees = employees.filter((emp) => emp.authUser);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      employees: finalEmployees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get users who do NOT have an employee profile
exports.getUnlinkedUsers = async (req, res) => {
  try {
    // 1️ Get all linked authUser IDs
    const linkedUserIds = await Employee.find().distinct("authUser");

    // 2️ Find users not in Employee table
    const unlinkedUsers = await Auth.find({
      _id: { $nin: linkedUserIds },
    })
      .populate("role", "roleName") // populate role name
      .select("name email role status");

    // 3️ Exclude Admins
    const filteredUsers = unlinkedUsers.filter(
      (user) => user.role?.roleName?.toLowerCase() !== "admin"
    );

    res.json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "authUser",
      "name email role status"
    );
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // Only employee or HR/Admin can view
    if (
      req.user.roleName === "Employee" &&
      req.user._id.toString() !== employee.authUser._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      authUser: req.user.id,
    }).populate({
      path: "authUser",
      select: "name email status role",
      populate: {
        path: "role",
        select: "roleName permissions",
      },
    });

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    // optional: merge authUser data into employee object
    const profile = {
      _id: employee._id,
      name: employee.name || employee.authUser.name,
      email: employee.email || employee.authUser.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      dateOfJoining: employee.dateOfJoining,
      manager: employee.manager,
      orgId: employee.orgId,
      status: employee.status, // virtual
      role: employee.authUser.role?.roleName,
    };

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
