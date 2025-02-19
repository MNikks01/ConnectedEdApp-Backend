const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            throw new AuthenticationError('Authentication token required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new AuthenticationError('Invalid or expired token');
    }
};

// GraphQL specific auth middleware
const graphqlAuth = (next) => async (root, args, context, info) => {
    if (!context.user) {
        throw new AuthenticationError('You must be logged in');
    }
    return next(root, args, context, info);
};

module.exports = { authMiddleware, graphqlAuth }; 