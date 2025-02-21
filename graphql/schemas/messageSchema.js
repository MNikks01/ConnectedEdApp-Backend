import { gql } from 'apollo-server-express';

const messageSchema = gql`
    type Message {
        id: ID!
        sender: ID!
        receiver: ID!
        text: String
        files: [String]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getConversation(userId: ID!): [Message]
        getAllConversations: [Message]
    }

    type Mutation {
        sendMessage(recipientId: ID!, content: String!): Message
        deleteMessage(messageId: ID!): String
        markAsRead(messageId: ID!): String
    }
`;

export default messageSchema; 