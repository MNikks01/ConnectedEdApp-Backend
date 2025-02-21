import { gql } from 'apollo-server-express';

const pollSchema = gql`
    type Poll {
        id: ID!
        question: String!
        options: [PollOption]
        createdBy: ID!
        visibility: String!
        votes: [ID!]
        expires: String!
        createdAt: String!
        updatedAt: String!
    }

    type PollOption {
        id: ID!
        text: String!
        votes: Int!
    }

    type Query {
        getAllPolls: [Poll]
        getPollById(id: ID!): Poll
    }

    type Mutation {
        createPoll(question: String!, options: [String!]!, visibility: String!, expires: String!): Poll
        updatePoll(id: ID!, question: String, options: [String], visibility: String, expires: String): Poll
        deletePoll(id: ID!): String
        votePoll(id: ID!, optionId: ID!): Poll
    }
`;

export default pollSchema; 