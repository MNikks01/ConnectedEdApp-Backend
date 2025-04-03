import { body, validationResult } from 'express-validator';

// User registration validation
export const validateCreateUser = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg, // Send first validation error message
                errors: errors.array(),
            });
        }
        next();
    }
];

// User login validation
export const validateLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                errors: errors.array(),
            });
        }
        next();
    }
];
