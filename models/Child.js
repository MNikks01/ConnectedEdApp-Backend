const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
    hasAccount: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    displayPic: String,
    medClsSec: {
        type: String,
        required: true,
        index: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    parentFather: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentMother: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    leaveApplications: [{
        type: Schema.Types.ObjectId,
        ref: 'LeaveApplication'
    }],
    feedback: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
}, { timestamps: true });

// Compound indexes
childSchema.index({ school: 1, medClsSec: 1 });
childSchema.index({ name: 1, school: 1 });

module.exports = mongoose.model('Child', childSchema); 