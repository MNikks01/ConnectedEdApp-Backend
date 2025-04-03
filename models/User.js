import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    currentRole: {
        type: String,
        enum: ['school', 'user', 'parent', 'principal', 'student', 'teacher'],
        required: true,
        index: true
    },
    roles: [{
        type: String,
        enum: ['parent', 'teacher', 'principal']
    }],
    group: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Follow'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Follow'
    }],
    sentRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'FriendRequest'
    }],
    recievedRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'FriendRequest'
    }],
    userData: {
        type: Schema.Types.ObjectId,
        ref: 'UserData'
    },
    schoolData: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolData'
    },
    accessToken: String,
    refreshToken: String,
    pushNotificationToken: String,
    poll: [{
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    }],
    chat: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
}, { timestamps: true });

// Indexes
userSchema.index({ role: 1 });

export const User = model('User', userSchema); 