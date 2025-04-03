import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    postOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    caption: {
        type: String,
        required: true
    },
    files: [String],
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

// Index for recent posts query
postSchema.index({ createdAt: -1 });
postSchema.index({ postOwner: 1, createdAt: -1 });

export const Post = model('Post', postSchema); 