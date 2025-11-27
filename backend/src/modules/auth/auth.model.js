// src/modules/auth/auth.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
        orgId: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        status: { type: String, enum: ["Pending", "Active"], default: "Pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
