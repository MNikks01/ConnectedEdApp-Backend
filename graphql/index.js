import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import eventSchema from './schemas/eventSchema.js';
import eventResolvers from './resolvers/eventResolvers.js';
// Import other schemas and resolvers as needed

const typeDefs = mergeTypeDefs([eventSchema]);
const resolvers = mergeResolvers([eventResolvers]);

export { typeDefs, resolvers }; 