// graphql/schemas/index.js
import { gql } from 'apollo-server-express';
import authSchema from './authSchema.js';
import userSchema from './userSchema.js';
import schoolSchema from './schoolSchema.js';
import syllabusSchema from './syllabusSchema.js';
import friendRequestSchema from './friendRequestSchema.js';
import postSchema from './postSchema.js';
import pollSchema from './pollSchema.js';
import notificationSchema from './notificationSchema.js';
import messageSchema from './messageSchema.js';
import noticeSchema from './noticeSchema.js';
import chatSchema from './chatSchema.js';
import commentSchema from './commentSchema.js';
import eventSchema from './eventSchema.js';
import feedbackSchema from './feedbackSchema.js';
import groupSchema from './groupSchema.js';
import leaveApplicationSchema from './leaveApplicationSchema.js';
import likeSchema from './likeSchema.js';
import projectAndHomeworkSchema from './projectAndHomeworkSchema.js';
import socialSchema from './socialSchema.js';
// import syllabusSchema from './syllabusSchema.js'

const baseSchema = gql`
  type Query
  type Mutation
`;

const typeDefs = [
  baseSchema, authSchema, userSchema, schoolSchema, syllabusSchema,
  friendRequestSchema, postSchema, pollSchema, notificationSchema, noticeSchema,
  messageSchema, chatSchema, commentSchema, eventSchema, feedbackSchema,
  groupSchema, leaveApplicationSchema, projectAndHomeworkSchema, likeSchema,
  socialSchema, syllabusSchema
];

export default typeDefs;
