const User = require('../models/user.model');
const Token = require('../models/token.model');
const { hashPassword } = require('../utils/hashPassword');
const { validateSignup } = require('../validations/user.validation');
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail');


const signup = async (req, res) => {
    try {
        //  Validate input
        const { error } = validateSignup(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { name, email, password, role, orgId } = req.body;

        //  Check existing user
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        //  Hash password
        const hashedPassword = await hashPassword(password);

        //  Create and save user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            orgId
        });

        await user.save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        const verificationUrl = `${process.env.BASE_URL}/api/users/${user._id}/verify-email/${token.token}`;
        const html = `<p>Click <a href="${verificationUrl}">here</a> to verify your email. Link expires in 1 hour.</p>`;

        await sendEmail(user.email, 'Verify Your Email', html);

        res.status(201).json({
            message: 'User registered successfully.An Email sent to your account please verify'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).json({ message: 'Invalid link' });

        if (user.isVerified)
            return res.status(400).json({ message: 'Email already verified' });

        const token = await Token.findOne({ userId: user._id, token: req.params.token });
        if (!token) return res.status(400).json({ message: 'Invalid or expired token' });

        await User.updateOne({ _id: user._id }, { isVerified: true });
        await token.deleteOne();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { signup, verifyEmail };

