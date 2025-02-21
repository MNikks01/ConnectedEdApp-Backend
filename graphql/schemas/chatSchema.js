// graphql/schemas/chatSchema.js
import { gql } from "apollo-server-express";

const chatSchema = gql`
    type Message {
        id: ID!
        content: String!
        sender: ID!
        createdAt: String!
    }

    type Chat {
        id: ID!
        user: ID!
        messages: [Message]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getChatHistory(chatId: ID!): [Message]
        getActiveChats: [Chat]
    }

    type Mutation {
        joinChat(chatId: ID!): String
        createChat(name: String!, participants: [ID!]!): Chat
        leaveChat(chatId: ID!): String
    }
`;

export default chatSchema;