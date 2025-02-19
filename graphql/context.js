// graphql/context.js
import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';

const context = async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new Error('Authentication token is missing');
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error('User not found');
    }

    return { user };
};

export default context;
