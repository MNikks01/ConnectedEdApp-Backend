const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveApplicationSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    userRole: {
        type: String,
        enum: ['parent', 'student', 'teacher'],
        required: true,
        index: true
    },
    child: {
        type: Schema.Types.ObjectId,
        ref: 'Child',
        index: true
    },
    text: String,
    subject: String,
    oneDay: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: String,
        required: true,
        index: true
    },
    endDate: String,
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'sent'],
        default: 'sent',
        index: true
    }
}, { timestamps: true });

// Compound indexes for leave application queries
leaveApplicationSchema.index({ school: 1, status: 1 });
leaveApplicationSchema.index({ owner: 1, status: 1 });

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema); 