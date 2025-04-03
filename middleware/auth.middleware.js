import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

// Express authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token required' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

// GraphQL authentication middleware
const graphqlAuth = (next) => async (root, args, context, info) => {
    if (!context.user) {
        throw new AuthenticationError('You must be logged in');
    }
    return next(root, args, context, info);
};

// Extract user from JWT for GraphQL context
const extractUserFromToken = (req) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
    } catch (error) {
        return null; // Return null if token is invalid
    }
};

module.exports = { authMiddleware, graphqlAuth, extractUserFromToken };
