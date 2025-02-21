import { gql } from 'apollo-server-express';

const leaveApplicationSchema = gql`
    type LeaveApplication {
        id: ID!
        school: ID!
        owner: ID!
        userRole: String!
        child: ID
        text: String
        subject: String
        oneDay: Boolean!
        startDate: String!
        endDate: String
        status: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllLeaveApplications: [LeaveApplication]
        getLeaveApplicationById(id: ID!): LeaveApplication
        getSchoolLeaveApplications(schoolId: ID!): [LeaveApplication]
        getUserLeaveApplications(userId: ID!): [LeaveApplication]
    }

    type Mutation {
        createLeaveApplication(school: ID!, userRole: String!, child: ID, text: String, subject: String, oneDay: Boolean!, startDate: String!, endDate: String): LeaveApplication
        updateLeaveApplication(id: ID!, text: String, subject: String, oneDay: Boolean, startDate: String, endDate: String): LeaveApplication
        deleteLeaveApplication(id: ID!): String
        updateLeaveStatus(id: ID!, status: String!): LeaveApplication
    }
`;

export default leaveApplicationSchema; 