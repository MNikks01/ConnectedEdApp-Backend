const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('PollVote', pollVoteSchema); 