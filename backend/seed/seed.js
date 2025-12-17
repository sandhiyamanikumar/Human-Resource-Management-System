const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
require("../src/config/db");

// Import models
const Module = require("../src/modules/module/module.model");
const Role = require("../src/modules/role/role.model");
const User = require("../src/modules/auth/auth.model");

// Define modules
const modulesData = [
  {
    moduleName: "admin",
    permissions: ["view", "create", "edit", "delete"],
    description: "Admin panel to manage the system",
  },
  {
    moduleName: "role",
    permissions: ["view", "create", "edit", "delete"],
    description: "Manage roles for users",
  },
  {
    moduleName: "assign-role",
    permissions: ["view", "edit"],
    description: "Assign roles to users",
  },
  {
    moduleName: "hr",
    permissions: ["view", "create", "edit"],
    description: "HR dashboard and management",
  },
  {
    moduleName: "employee",
    permissions: ["view", "create", "edit", "view-my-profile"],
    description: "Employee management module",
  },
  {
    moduleName: "leave",
    permissions: [
      "view",
      "create",
      "approve",
      "reject",
      "cancel",
      "delete",
      "viewAll",
    ],
    description: "Leave requests and approvals",
  },
  {
    moduleName: "module",
    permissions: ["view", "create", "edit", "delete"],
    description: "Manage system modules",
  },
];

// Define roles
const rolesData = [
  {
    roleName: "admin",
    permissions: {
      admin: ["view", "create", "edit", "delete"],
      role: ["view", "create", "edit", "delete"],
      "assign-role": ["view", "edit"],
      hr: ["view", "create", "edit"],
      employee: ["view", "create", "edit", "view-my-profile"],
      leave: ["view", "create", "approve", "reject"],
      module: ["view", "create", "edit", "delete"],
    },
  },
  {
    roleName: "hr",
    permissions: {
      hr: ["view", "create", "edit"],
      employee: ["view", "create", "edit"],
      leave: ["view", "create", "approve"],
    },
  },
  {
    roleName: "employee",
    permissions: {
      employee: ["view"],
      leave: ["view", "create", "view-my-profile"],
    },
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Atlas connected");

    if (process.env.NODE_ENV !== "production") {
      await Module.deleteMany({});
      await Role.deleteMany({});
    }

    // Insert modules
    await Module.insertMany(modulesData);
    console.log("Modules seeded");

    // Insert roles
    await Role.insertMany(rolesData);
    console.log("Roles seeded");

    // Create admin user
    const adminRole = await Role.findOne({ roleName: "admin" });

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: adminRole._id,
      orgId: "ORG-ADMIN-001",
      isVerified: true,
      status: "Active",
    });

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }

    mongoose.disconnect();
    console.log("Seeding completed and MongoDB disconnected");
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seedDB();
