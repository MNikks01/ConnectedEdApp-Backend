// models/Teacher.js
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjects: [{ type: String }],
    qualifications: [{ type: String }],
    awards: [{ type: String }],
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
}, { timestamps: true });

// Index for subjects to find teachers who teach specific subjects
teacherSchema.index({ subjects: 1 });

// Index for school to get all teachers in a school
teacherSchema.index({ school: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
