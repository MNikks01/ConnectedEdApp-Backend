const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'GroupRequest'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    admin: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'GroupChat'
    }
}, { timestamps: true });

// Compound indexes for group queries
groupSchema.index({ name: 1, createdBy: 1 });
groupSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Group', groupSchema); 