// utils/generateToken.js

import jwt from 'jsonwebtoken';

// Function to generate JWT Token
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set your desired token expiration time
    });
    return token;
};
