import { ApolloServer } from 'apollo-server-express';
import { config } from './config.js';

export const configureApollo = async (app, typeDefs, resolvers, context) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        csrfPrevention: true,
        cache: 'bounded',
        formatError: (error) => {
            // Remove the internal sequelize error message
            if (error.message.startsWith('Database Error: ')) {
                return new Error('Internal server error');
            }
            return error;
        },
        plugins: [
            process.env.NODE_ENV === 'development' && {
                async serverWillStart() {
                    console.log('Apollo Server starting');
                },
            },
        ].filter(Boolean),
    });

    await server.start();

    server.applyMiddleware({
        app,
        cors: config.cors,
        path: '/graphql'
    });

    return server;
}; 