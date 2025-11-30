const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Auth = require('../src/modules/auth/auth.model'); // your Auth/User model
const Employee = require('../src/modules/employee/employee.model'); // Employee model

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

async function createDummyData() {
    try {
        const totalUsers = 30; // number of dummy users/employees
        const passwordHash = await bcrypt.hash('password123', 10);

        for (let i = 1; i <= totalUsers; i++) {
            // Create Auth user
            const authUser = new Auth({
                name: `Dummy User ${i}`,
                email: `dummy${i}@example.com`,
                password: passwordHash,
                role: null, // assign role later if needed
                orgId: `ORG-EMP-${1000 + i}`,
                isVerified: true,
                status: 'Active',
            });

            await authUser.save();

            // Create Employee linked to this Auth user
            const employee = new Employee({
                authUser: authUser._id,
                name: authUser.name,
                email: authUser.email,
                orgId: authUser.orgId,
                department: ['IT', 'HR', 'Finance'][i % 3],
                designation: ['Developer', 'Manager', 'Analyst'][i % 3],
                dateOfJoining: new Date(2025, 10, i),
                status: 'active',
                manager: `Manager ${i % 5 + 1}`,
            });

            await employee.save();

            console.log(`Created Employee: ${employee.name}`);
        }

        console.log('✅ Dummy users and employees created successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createDummyData();
