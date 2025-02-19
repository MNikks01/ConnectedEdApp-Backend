// middlewares/corsMiddleware.js
import cors from 'cors';

const corsOptions = {
    origin: 'http://yourfrontend.com', // Allow your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
