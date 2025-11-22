// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
require('../../config/db');

// Import your models
const Module = require('../module/module.model');
const Role = require('../role/role.model');

const modulesData = [
    { moduleName: "admin", permissions: ["view", "create", "edit", "delete"] },
    { moduleName: "role", permissions: ["view", "create", "edit", "delete"] },
    { moduleName: "hr", permissions: ["view", "create", "edit"] },
    { moduleName: "employee", permissions: ["view", "create", "edit"] },
    { moduleName: "leave", permissions: ["view", "create", "approve", "reject"] },
    { moduleName: "attendance", permissions: ["view", "mark"] },
];

const rolesData = [
    {
        roleName: "admin",
        permissions: {
            admin: ["view", "create", "edit", "delete"],
            role: ["view", "create", "edit", "delete"], 
            hr: ["view", "create", "edit"],
            employee: ["view", "create", "edit"],
            leave: ["view", "create", "approve", "reject"],
            attendance: ["view", "mark"],
        },
    },
    {
        roleName: "hr",
        permissions: {
            hr: ["view", "create", "edit"],
            employee: ["view", "create", "edit"],
            leave: ["view", "create", "approve"],
            attendance: ["view"],
        },
    },
    {
        roleName: "employee",
        permissions: {
            employee: ["view"],
            leave: ["view", "create"],
            attendance: ["view", "mark"],
        },
    },
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");

        // Clear existing data (optional)
        await Module.deleteMany({});
        await Role.deleteMany({});

        // Insert modules
        await Module.insertMany(modulesData);
        console.log("Modules seeded");

        // Insert roles
        await Role.insertMany(rolesData);
        console.log("Roles seeded");

        mongoose.disconnect();
        console.log("Seeding completed and MongoDB disconnected");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

seedDB();
