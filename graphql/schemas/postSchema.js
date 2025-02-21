import { gql } from 'apollo-server-express';

const postSchema = gql`
    type Post {
        id: ID!
        postOwner: ID!
        caption: String!
        files: [String]
        likes: [ID!]
        comments: [ID!]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllPosts: [Post]
        getPostById(id: ID!): Post
    }

    type Mutation {
        createPost(caption: String!, files: [String]): Post
        updatePost(id: ID!, caption: String, files: [String]): Post
        deletePost(id: ID!): String
        likePost(id: ID!): Post
    }
`;

export default postSchema; 