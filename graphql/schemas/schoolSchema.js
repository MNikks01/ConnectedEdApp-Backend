// graphql/schemas/schoolSchema.js
import { gql } from 'apollo-server-express';

const schoolSchema = gql`
  type School {
    id: ID!
    name: String!
    vision: String
    mission: String
    contactDetails: String
    address: String
    infrastructure: String
    facilities: [String!]
    achievements: [String!]
    teachers: [Teacher!]!
  }

  input SchoolInput {
    name: String!
    vision: String
    mission: String
    contactDetails: String
    address: String
    infrastructure: String
    facilities: [String!]
    achievements: [String!]
  }

  type Query {
    getSchool(id: ID!): School
    getAllSchools: [School!]!
  }

  type Mutation {
    createSchool(input: SchoolInput!): School!
    updateSchool(id: ID!, input: SchoolInput!): School!
    deleteSchool(id: ID!): Boolean!
  }
`;

export default schoolSchema;
