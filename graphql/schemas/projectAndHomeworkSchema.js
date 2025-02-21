import { gql } from 'apollo-server-express';

const projectAndHomeworkSchema = gql`
    type ProjectAndHomework {
        id: ID!
        questionImage: String
        questionStatement: String!
        submitBefore: String!
        questionNote: String
        type: String!
        teacher: ID!
        school: ID!
        schoolClass: String
        schoolMedium: String
        schoolSection: String
        clsMedSec: String!
        subject: String!
        submittedData: [ID!]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllProjectsAndHomeworks: [ProjectAndHomework]
        getProjectAndHomeworkById(id: ID!): ProjectAndHomework
    }

    type Mutation {
        createProjectAndHomework(
            questionImage: String,
            questionStatement: String!,
            submitBefore: String!,
            questionNote: String,
            type: String!,
            schoolClass: String,
            schoolMedium: String,
            schoolSection: String,
            clsMedSec: String!,
            subject: String!
        ): ProjectAndHomework
        updateProjectAndHomework(
            id: ID!,
            questionImage: String,
            questionStatement: String,
            submitBefore: String,
            questionNote: String,
            type: String,
            schoolClass: String,
            schoolMedium: String,
            schoolSection: String,
            clsMedSec: String,
            subject: String
        ): ProjectAndHomework
        deleteProjectAndHomework(id: ID!): String
    }
`;

export default projectAndHomeworkSchema; 