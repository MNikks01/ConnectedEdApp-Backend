const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherDataSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    subjectTeach: [{
        type: Schema.Types.ObjectId,
        ref: 'TeachSubject'
    }],
    isClassteacher: {
        type: Boolean,
        default: false
    },
    classTeacherData: {
        type: Schema.Types.ObjectId,
        ref: 'ClassTeacher'
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

// Compound index for school and isClassteacher
teacherDataSchema.index({ school: 1, isClassteacher: 1 });

module.exports = mongoose.model('TeacherData', teacherDataSchema); 