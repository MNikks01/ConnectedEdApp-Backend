// graphql/schemas/commentSchema.js
import { gql } from 'apollo-server-express';

const commentSchema = gql`
    type Comment {
        id: ID!
        commentText: String!
        commentImage: String
        commentOwner: ID!
        commentPost: ID!
        commentComment: ID
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getComments(postId: ID!): [Comment]
    }

    type Mutation {
        createComment(postId: ID!, commentText: String!, commentImage: String): Comment
        updateComment(commentId: ID!, commentText: String!): Comment
        deleteComment(commentId: ID!): String
    }
`;

export default commentSchema;