

// graphql/schemas/authSchema.js
import { gql } from 'apollo-server-express';

const socialSchema = gql`
  type Query {
    getUserProfile(id: ID!): User
    getAllPosts: [Post]
}

type Mutation {
    followUser(userId: ID!): String
    sendFriendRequest(userId: ID!): String
    createPost(content: String!): Post
    likePost(postId: ID!): String
}

type User {
    id: ID!
    name: String!
    bio: String
    profilePicture: String
    followers: [User]
    following: [User]
}

type Post {
    id: ID!
    user: User!
    content: String!
    likes: [User]
    comments: [Comment]
}

type Comment {
    id: ID!
    user: User!
    text: String!
}
`;

export default socialSchema;
