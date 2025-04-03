import { Schema, model } from 'mongoose';

const followSchema = new Schema({
    followerUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    followingUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

// Compound index for follower-following relationship
followSchema.index({ followerUser: 1, followingUser: 1 }, { unique: true });

export const Follow = model('Follow', followSchema); 