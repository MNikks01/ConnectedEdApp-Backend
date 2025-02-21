import { gql } from 'apollo-server-express';

const eventSchema = gql`
    type Event {
        id: ID!
        date: String!
        title: String!
        description: String
        type: String
        mode: String
        owner: ID!
        crowdAllowed: String
        chiefGuest: [ID]
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        events: [Event!]!
        event(id: ID!): Event
    }

    extend type Mutation {
        createEvent(date: String!, title: String!, description: String, type: String, mode: String, owner: ID!, crowdAllowed: String, chiefGuest: [ID]): Event!
        updateEvent(id: ID!, date: String, title: String, description: String, type: String, mode: String, crowdAllowed: String, chiefGuest: [ID]): Event!
        deleteEvent(id: ID!): Event!
    }
`;

export default eventSchema; 