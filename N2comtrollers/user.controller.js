import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user', details: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: 'Error logging in', details: err.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, bio, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, bio, profilePicture },
            { new: true }
        );

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(400).json({ error: 'Error updating profile', details: err.message });
    }
};
