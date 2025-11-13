const User = require('../models/user.model');
const { hashPassword } = require('../utils/hashPassword');
const { validateSignup } = require('../validations/user.validation');

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

        //  Response
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = signup;
