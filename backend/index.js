const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectDB = require("./src/config/db");
const userRoutes = require('../backend/src/routes/user.routes.js'); // correct path


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("HRMS Backend Running...");
});

app.use('/api/users', userRoutes);
app.use('/api/admin', require('./src/routes/admin.routes.js'));
app.use('/api/hr', require('./src/routes/hr.routes.js'));
app.use('/api/employee', require('./src/routes/employee.routes.js'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
