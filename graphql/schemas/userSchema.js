// graphql/schemas/userSchema.js
import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    roles: [String]
    group: [ID]
    followers: [ID]
    following: [ID]
    userData: ID
    schoolData: ID
    accessToken: String
    refreshToken: String
    pushNotificationToken: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getUserProfile: User
  }

  type Mutation {
    createUser(email: String!, password: String!, role: String!): User
    updateUser(id: ID!, email: String, password: String, role: String): User
    deleteUser(id: ID!): String
    changePassword(currentPassword: String!, newPassword: String!): String
  }
`;

export default userSchema;
