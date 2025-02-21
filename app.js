// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { configureMiddleware } from './config/middleware.js';

// Import middlewares
import { authMiddleware } from './middleware/auth.middleware';
import errorMiddleware from './middleware/error.middleware';
import { typeDefs, resolvers } from './graphql/index.js'; // Ensure this path is correct

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

// Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // You can add authentication or other context here if needed
        return { req };
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

