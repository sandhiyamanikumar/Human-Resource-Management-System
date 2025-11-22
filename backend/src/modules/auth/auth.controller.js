const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('./token.model');
const { hashPassword } = require('../../utils/hashPassword');
const { validateSignup } = require('./auth.validation');
const sendEmail = require('../../utils/sendEmail');
const User = require("./auth.model");
const Role = require("../role/role.model");

const signup = async (req, res) => {
    try {
        const { error } = validateSignup(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { name, email, password, role, orgId } = req.body;

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        // Convert role string → find Role document
        const roleDoc = await Role.findOne({ roleName: role.trim().toLowerCase() });
        if (!roleDoc) return res.status(400).json({ message: "Invalid role" });

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user with ROLE OBJECT ID
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: roleDoc._id,
            orgId
        });

        await user.save();

        // Create email verification token
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const verificationUrl = `${process.env.BACKEND_BASE_URL}/api/auth/${user._id}/verify-email/${token.token}`;
        const html = `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`;

        res.status(201).json({ message: 'User registered successfully. Verify email.' });

        sendEmail(user.email, 'Verify Your Email', html)
            .then(() => console.log('Verification email sent'))
            .catch(err => console.error('Email sending failed', err));

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Email verification
const verifyEmail = async (req, res) => {
    try {
        const { id, token } = req.params;

        const user = await User.findById(id);
        if (!user)
            return res.redirect(`http://localhost:5173/verify-email/${id}/${token}?status=invalid`);

        // If user is already verified → return already verified (even if token deleted)
        if (user.isVerified)
            return res.redirect(`http://localhost:5173/verify-email/${id}/${token}?status=already`);

        // User not verified yet → check token
        const tokenDoc = await Token.findOne({ userId: id, token });

        if (!tokenDoc) {
            // Token missing → EXPIRED
            return res.redirect(`http://localhost:5173/verify-email/${id}/${token}?status=expired`);
        }

        // Token found → verify user
        await User.updateOne({ _id: id }, { isVerified: true });

        // delete token after verify
        await tokenDoc.deleteOne();

        return res.redirect(`http://localhost:5173/verify-email/${id}/${token}?status=success`);

    } catch (error) {
        return res.redirect(`http://localhost:5173/verify-email/error`);
    }
};

// SIGN IN
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate("role");
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { id: user._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role.roleName,
                permissions: user.role.permissions
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("role");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role.roleName,
            permissions: user.role.permissions
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { signup, verifyEmail, signin, getMe };

