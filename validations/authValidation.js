// validations/authValidation.js

import { validateEmail, validatePassword } from '../utils/validator.js';

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Validate email and password format
    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: 'Password is too weak' });
    }

    next();
};

export const validateRegister = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    // Check if email, password, and confirmPassword are provided
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate email and password format
    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: 'Password is too weak' });
    }

    next();
};
