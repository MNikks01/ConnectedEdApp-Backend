import { gql } from 'apollo-server-express';

const friendRequestSchema = gql`
    type FriendRequest {
        id: ID!
        sender: ID!
        receiver: ID!
        status: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getPendingRequests: [FriendRequest]
        getFriendsList: [User]
    }

    type Mutation {
        followUser(userId: ID!): String
        unfollowUser(userId: ID!): String
        sendFriendRequest(userId: ID!): String
        acceptFriendRequest(requestId: ID!): String
        rejectFriendRequest(requestId: ID!): String
        cancelFriendRequest(userId: ID!): String
        removeFriend(friendId: ID!): String
    }
`;

export default friendRequestSchema; 