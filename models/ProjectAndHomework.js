const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectAndHomeworkSchema = new Schema({
    questionImage: String,
    questionStatement: {
        type: String,
        required: true
    },
    submitBefore: {
        type: String,
        required: true,
        index: true
    },
    questionNote: String,
    type: {
        type: String,
        enum: ['project', 'homework', 'assignment'],
        required: true,
        index: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    schoolClass: String,
    schoolMedium: String,
    schoolSection: String,
    clsMedSec: {
        type: String,
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true,
        index: true
    },
    submittedData: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, { timestamps: true });

// Compound indexes for querying assignments
projectAndHomeworkSchema.index({ school: 1, clsMedSec: 1 });
projectAndHomeworkSchema.index({ teacher: 1, subject: 1 });
projectAndHomeworkSchema.index({ type: 1, submitBefore: 1 });

module.exports = mongoose.model('ProjectAndHomework', projectAndHomeworkSchema); 