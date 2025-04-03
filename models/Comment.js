import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    commentText: String,
    commentImage: String,
    commentOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    commentPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        index: true
    },
    commentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        index: true
    }
}, { timestamps: true });

// Indexes for querying comments
commentSchema.index({ commentPost: 1, createdAt: -1 });
commentSchema.index({ commentComment: 1, createdAt: -1 });

export const Comment = model('Comment', commentSchema); 