const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teachSubjectSchema = new Schema({
    subject: {
        type: String,
        required: true,
        index: true
    },
    medClsSec: {
        type: String,
        required: true,
        index: true
    },
    verifiedBySchool: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Compound index for subject and medClsSec
teachSubjectSchema.index({ subject: 1, medClsSec: 1 });

module.exports = mongoose.model('TeachSubject', teachSubjectSchema); 