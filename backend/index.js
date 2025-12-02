const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectDB = require("./src/config/db.js");

const authRoutes = require('./src/modules/auth/auth.routes.js')
const roleRoutes = require('./src/modules/role/role.routes');
const moduleRoutes = require('./src/modules/module/module.routes');
const userRoutes = require("./src/modules/user/user.routes.js");
const leaveRoutes = require("./src/modules/leave/leave.routes.js");

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => {
    res.send("HRMS Backend Running...");
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./src/modules/admin/admin.routes.js'));
app.use('/api/employee', require('./src/modules/employee/employee.routes.js'));
app.use('/api/roles', roleRoutes);
app.use('/api/modules', moduleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
