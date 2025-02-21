import { gql } from 'apollo-server-express';

const noticeSchema = gql`
    type Notice {
        id: ID!
        subject: String!
        owner: ID!
        viewedBy: [ID!]
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllNotices: [Notice]
        getNoticeById(id: ID!): Notice
    }

    type Mutation {
        createNotice(subject: String!, description: String!): Notice
        updateNotice(id: ID!, subject: String, description: String): Notice
        deleteNotice(id: ID!): String
    }
`;

export default noticeSchema; 