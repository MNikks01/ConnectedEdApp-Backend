import { Schema, model } from 'mongoose';

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

export const TeachSubject = model('TeachSubject', teachSubjectSchema); 