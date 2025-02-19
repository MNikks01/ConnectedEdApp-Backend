const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'PollOption'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        validate: {
            validator: async function (value) {
                const user = await mongoose.model('User').findById(value);
                return user && user.role === 'school';
            },
            message: 'Poll can only be created by schools'
        }
    },
    visibility: {
        type: String,
        enum: ['schoolSpecific', 'general'],
        required: true,
        index: true
    },
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'PollVote'
    }],
    expires: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7'],
        required: true
    }
}, { timestamps: true });

// Indexes for poll queries
pollSchema.index({ createdBy: 1, visibility: 1 });
pollSchema.index({ expires: 1 });

module.exports = mongoose.model('Poll', pollSchema); 