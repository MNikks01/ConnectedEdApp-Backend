// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';
import typeDefs from './graphql/schemas/index.js'; // Importing GraphQL type definitions
import resolvers from './graphql/resolvers/index.js'; // Importing GraphQL resolvers

// Import middlewares
import { authMiddleware } from './middleware/auth.middleware';
import errorMiddleware from './middleware/error.middleware';

// Load environment variables from .env file
dotenv.config();

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

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // You can add authentication or other context here if needed
        const user = req.user; // Assuming user info is available in the request
        return { user };
    },
});

// Apply middleware to connect Apollo Server with Express
server.applyMiddleware({ app });

// Routes for different features
import userRoutes from './routes/user.routes.js'
import socialRoutes from './routes/social.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
import eventRoutes from './routes/event.routes.js';
import groupRoutes from './routes/group.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import pollRoutes from './routes/poll.routes.js';
import postRoutes from './routes/post.routes.js';
import projectAndHomeworkRoutes from './routes/projectAndHomework.routes.js';
import syllabusRoutes from './routes/syllabus.routes.js';

app.use('/api/user', userRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects-and-homeworks', projectAndHomeworkRoutes);
app.use('/api/syllabuses', syllabusRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the eSchooling Platform');
});

// Server setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});

