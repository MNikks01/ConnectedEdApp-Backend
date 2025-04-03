import cors from 'cors';

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Use env variable for frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies & authentication headers
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
