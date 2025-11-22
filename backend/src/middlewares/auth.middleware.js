const jwt = require("jsonwebtoken");
const User = require("../modules/auth/auth.model");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).populate("role");
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = {
            id: user._id,
            role: user.role.roleName,
            permissions: user.role.permissions
        };

        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
