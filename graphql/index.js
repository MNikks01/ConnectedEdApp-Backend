import { ApolloServer } from 'apollo-server-express';
import userSchema from './schemas/userSchema.js';
import userResolvers from './resolvers/userResolvers.js';

const server = new ApolloServer({
    typeDefs: [userSchema],
    resolvers: [userResolvers],
    context: ({ req }) => {
        // Add your context logic here (e.g., authentication)
        return { user: req.user };
    }
});

export default server; 