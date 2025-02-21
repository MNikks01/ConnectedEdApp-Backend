import { gql } from 'apollo-server-express';

const likeSchema = gql`
    type Like {
        id: ID!
        likedPost: ID
        likedBy: ID!
        likedComment: ID
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getLikes(postId: ID!): [Like]
    }

    type Mutation {
        likePost(postId: ID!): Like
        unlikePost(postId: ID!): String
    }
`;

export default likeSchema; 