const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require('../backend/src/routes/user.routes.js'); // correct path

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("HRMS Backend Running...");
});

app.use('/api/users', userRoutes); // mount routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
