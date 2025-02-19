const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['sent', 'accepted', 'rejected'],
        default: 'sent',
        index: true
    }
}, { timestamps: true });

// Compound indexes for request queries
groupRequestSchema.index({ group: 1, status: 1 });
groupRequestSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('GroupRequest', groupRequestSchema); 