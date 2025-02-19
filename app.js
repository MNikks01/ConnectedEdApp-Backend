// server.js
import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import socialRoutes from './routes/social.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';

import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';

// Import middlewares
import { authMiddleware } from './middleware/auth.middleware';
import errorMiddleware from './middleware/error.middleware';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Configure middleware
configureMiddleware(app);

// Connect to database
await connectDB();

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply auth middleware to protected routes
app.use('/api/protected', authMiddleware);

// Error handling
app.use(errorMiddleware);

// Apollo Server setup
const server = new ApolloServer({
    // typeDefs and resolvers will go here
    context: ({ req, res }) => ({ req, res })
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql', cors: false });
}

startServer();

// Routes for different features
app.use('/api/auth', authRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the eSchooling Platform');
});

// Server setup
app.listen(config.app.port, () => {
    console.log(`Server running on port ${config.app.port}`);
    console.log(`GraphQL endpoint: http://localhost:${config.app.port}${server.graphqlPath}`);
});

