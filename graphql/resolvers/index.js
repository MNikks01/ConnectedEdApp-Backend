// graphql/resolvers/index.js
import { mergeResolvers } from '@graphql-tools/merge';
import authResolver from './authResolver.js';
import userResolver from './userResolver.js';
import schoolResolver from './schoolResolver.js';

const resolvers = mergeResolvers([authResolver, userResolver, schoolResolver]);

export default resolvers;
