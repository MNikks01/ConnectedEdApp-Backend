// graphql/schemas/index.js
import { gql } from 'apollo-server-express';
import authSchema from './authSchema.js';
import userSchema from './userSchema.js';
import schoolSchema from './schoolSchema.js';

const baseSchema = gql`
  type Query
  type Mutation
`;

const typeDefs = [baseSchema, authSchema, userSchema, schoolSchema];

export default typeDefs;
