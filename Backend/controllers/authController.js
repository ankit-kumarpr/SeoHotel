const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
const login = async (req, res) => {
   const { email, password } = req.body;
    try {
        const admin = await User.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: admin._id }, config.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful',admin, token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Profile
const profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Logout
const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    logout,
    profile,
    login,
    register
};
