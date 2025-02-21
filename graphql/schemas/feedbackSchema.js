import { gql } from 'apollo-server-express';

const feedbackSchema = gql`
    type Feedback {
        id: ID!
        owner: ID!
        ownerRole: String!
        school: ID!
        type: String!
        description: String
        child: ID
        status: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllFeedbacks: [Feedback]
        getFeedbackById(id: ID!): Feedback
    }

    type Mutation {
        createFeedback(ownerRole: String!, school: ID!, type: String!, description: String, child: ID): Feedback
        updateFeedback(id: ID!, ownerRole: String, school: ID, type: String, description: String, child: ID): Feedback
        deleteFeedback(id: ID!): String
    }
`;

export default feedbackSchema;
