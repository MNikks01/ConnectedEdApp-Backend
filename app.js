import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';
import typeDefs from './graphql/schemas/index.js';
import resolvers from './graphql/resolvers/index.js';

// Routes
import userRoutes from './routes/user.routes.js';
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

// Import middlewares
import { authMiddleware } from './middleware/auth.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure middleware
configureMiddleware(app);

// Connect to the database
(async () => {
    await connectDB();

    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            user: extractUserFromToken(req),
        }),
    });

    await server.start(); // Important for Apollo Server v3+

    // Apply middleware to connect Apollo Server with Express
    server.applyMiddleware({ app });

    // Static folder for uploads
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Apply authentication middleware
    app.use('/api/protected', authMiddleware);

    // Routes
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

    // Error handling
    app.use(errorMiddleware);

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });

})();
