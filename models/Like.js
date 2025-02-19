const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    likedPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        index: true
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    likedComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        index: true
    }
}, { timestamps: true });

// Compound indexes for preventing duplicate likes
likeSchema.index({ likedPost: 1, likedBy: 1 });
likeSchema.index({ likedComment: 1, likedBy: 1 });

module.exports = mongoose.model('Like', likeSchema); 