import { Schema, model } from 'mongoose';

const pollVoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    option: {
        type: Schema.Types.ObjectId,
        ref: 'PollOption',
        required: true,
        index: true
    }
}, { timestamps: true });

// Compound index to ensure one vote per user per option
pollVoteSchema.index({ user: 1, option: 1 }, { unique: true });

export const PollVote = model('PollVote', pollVoteSchema); 