const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const syllabusCoveredSchema = new Schema({
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
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true,
        index: true
    },
    currentChapter: String,
    chapterCompleted: [String]
}, { timestamps: true });

// Compound indexes for syllabus queries
syllabusCoveredSchema.index({ school: 1, clsMedSec: 1 });
syllabusCoveredSchema.index({ teacher: 1, subject: 1 });

module.exports = mongoose.model('SyllabusCovered', syllabusCoveredSchema); 