// graphql/schemas/authSchema.js
import { gql } from 'apollo-server-express';

const authSchema = gql`
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    login(input: LoginInput!): AuthData!
  }

  type Mutation {
    register(input: RegisterInput!): User!
  }
`;

export default authSchema;
