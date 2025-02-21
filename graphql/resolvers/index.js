// graphql/resolvers/index.js
import syllabusResolvers from './syllabusResolvers.js';
import friendRequestResolvers from './friendRequestResolvers.js';
import postResolvers from './postResolvers.js';
import pollResolvers from './pollResolvers.js';
import notificationResolvers from './notificationResolvers.js';
import noticeResolvers from './noticeResolvers.js';
import messageResolvers from './messageResolvers.js';
import authResolver from './authResolver.js'
import chatResolvers from './chatResolver.js';
import commentResolvers from './commentResolvers.js';
import eventResolvers from './eventResolvers.js'
import feedbackResolvers from './feedbackResolvers.js';
import groupResolvers from './groupResolvers.js';
import leaveApplicationResolvers from './leaveApplicationResolvers.js';
import likeResolvers from './likeResolvers.js';
import projectAndHomeworkResolvers from './projectAndHomeworkResolvers.js';
import userResolvers from './userResolvers.js';

const resolvers = {
    Query: {
        ...syllabusResolvers.Query,
        ...friendRequestResolvers.Query,
        ...postResolvers.Query,
        ...pollResolvers.Query,
        ...notificationResolvers.Query,
        ...noticeResolvers.Query,
        ...messageResolvers.Query,
        ...authResolver.Query,
        ...chatResolvers.Query,
        ...commentResolvers.Query,
        ...feedbackResolvers.Query,
        ...groupResolvers.Query,
        ...leaveApplicationResolvers.Query,
        ...likeResolvers.Query,
        ...projectAndHomeworkResolvers.Query,
        ...userResolvers.Query,
        ...eventResolvers.Query,
    },
    Mutation: {
        ...syllabusResolvers.Mutation,
        ...friendRequestResolvers.Mutation,
        ...postResolvers.Mutation,
        ...pollResolvers.Mutation,
        ...notificationResolvers.Mutation,
        ...noticeResolvers.Mutation,
        ...messageResolvers.Mutation,
        ...authResolver.Mutation,
        ...chatResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...feedbackResolvers.Mutation,
        ...groupResolvers.Mutation,
        ...leaveApplicationResolvers.Mutation,
        ...likeResolvers.Mutation,
        ...projectAndHomeworkResolvers.Mutation,
        ...userResolvers.Mutation,
        ...eventResolvers.Mutation,
    },
};

export default resolvers;
