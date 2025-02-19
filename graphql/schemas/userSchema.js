// graphql/schemas/userSchema.js
import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profilePicture: String
    bio: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User!]!
  }

  input UpdateUserInput {
    name: String
    email: String
    bio: String
    profilePicture: String
  }

  type Mutation {
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;

export default userSchema;
