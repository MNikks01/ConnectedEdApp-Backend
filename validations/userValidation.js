// validations/userValidation.js

import { validateEmail } from '../utils/validator.js';

export const validateUserProfileUpdate = (req, res, next) => {
    const { name, email, bio } = req.body;

    // Check if fields are provided
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (bio && bio.length > 500) {
        return res.status(400).json({ success: false, message: 'Bio should not exceed 500 characters' });
    }

    next();
};
