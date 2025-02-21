import { gql } from 'apollo-server-express';

const notificationSchema = gql`
    type Notification {
        id: ID!
        user: ID!
        type: String!
        message: String
        data: String
        isRead: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllNotifications: [Notification]
        getNotificationById(id: ID!): Notification
    }

    type Mutation {
        createNotification(type: String!, message: String, data: String): Notification
        updateNotification(id: ID!, type: String, message: String, data: String): Notification
        deleteNotification(id: ID!): String
    }
`;

export default notificationSchema; 