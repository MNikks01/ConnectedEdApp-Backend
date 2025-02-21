import { gql } from 'apollo-server-express';

const groupSchema = gql`
    type Group {
        id: ID!
        name: String!
        description: String
        members: [ID!]!
        requests: [ID!]!
        createdBy: ID!
        admin: [ID!]!
        chat: ID
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllGroups: [Group]
        getGroupById(id: ID!): Group
    }

    type Mutation {
        createGroup(name: String!, description: String): Group
        updateGroup(id: ID!, name: String, description: String): Group
        deleteGroup(id: ID!): String
        addMember(id: ID!, userId: ID!): Group
        removeMember(id: ID!, userId: ID!): Group
        addAdmin(id: ID!, userId: ID!): Group
        removeAdmin(id: ID!, userId: ID!): Group
        joinGroup(id: ID!): Group
        leaveGroup(id: ID!): String
    }
`;

export default groupSchema; 