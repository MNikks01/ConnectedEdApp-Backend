import rateLimit from 'express-rate-limit';

// General API rate limiter (for all routes)
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Login-specific rate limiter (stricter to prevent brute-force attacks)
export const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 5 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
