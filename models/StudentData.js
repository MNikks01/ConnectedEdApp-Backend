import { Schema, model } from 'mongoose';

const studentDataSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

// Compound index for school and medClsSec
studentDataSchema.index({ school: 1, medClsSec: 1 });

export const StudentData = model('StudentData', studentDataSchema); 