import { gql } from 'apollo-server-express';

const syllabusSchema = gql`
    type Syllabus {
        id: ID!
        school: ID!
        schoolClass: String
        schoolMedium: String
        schoolSection: String
        clsMedSec: String!
        teacher: ID!
        subject: String!
        currentChapter: String
        chapterCompleted: [String]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getAllSyllabuses: [Syllabus]
        getSyllabusById(id: ID!): Syllabus
    }

    type Mutation {
        createSyllabus(
            school: ID!,
            schoolClass: String,
            schoolMedium: String,
            schoolSection: String,
            clsMedSec: String!,
            subject: String!,
            currentChapter: String,
            chapterCompleted: [String]
        ): Syllabus
        updateSyllabus(
            id: ID!,
            schoolClass: String,
            schoolMedium: String,
            schoolSection: String,
            clsMedSec: String,
            subject: String,
            currentChapter: String,
            chapterCompleted: [String]
        ): Syllabus
        deleteSyllabus(id: ID!): String
    }
`;

export default syllabusSchema; 