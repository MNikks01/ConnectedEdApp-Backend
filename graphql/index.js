import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import typeDefs from './schemas'; // Assuming you have an index file in schemas that exports all schemas
import resolvers from './resolvers'; // Assuming you have an index file in resolvers that exports all resolvers

const startServer = async () => {
    const app = express();

    // Connect to MongoDB
    await mongoose.connect('your_mongodb_connection_string', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            // Add your authentication logic here
            const user = req.user; // Assuming you have user info in the request
            return { user };
        },
    });

    // Apply middleware to connect Apollo Server with Express
    server.applyMiddleware({ app });

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer(); 