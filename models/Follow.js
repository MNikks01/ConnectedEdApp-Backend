const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Follow', followSchema); 