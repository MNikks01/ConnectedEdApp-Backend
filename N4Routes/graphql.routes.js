// routes/graphqlRoutes.js
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema.js';  // Import your GraphQL schema
import resolvers from '../graphql/resolvers.js';  // Import your resolvers

const router = express.Router();

router.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'development',  // Enable GraphiQL in development mode
}));

export default router;
