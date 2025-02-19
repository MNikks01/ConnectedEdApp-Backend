// models/Timetable.js
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
    class: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher
    days: { type: [String], enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
}, { timestamps: true });

// Index for class to find the timetable for specific classes
timetableSchema.index({ class: 1 });

// Index for teacher to find timetables of a specific teacher
timetableSchema.index({ teacher: 1 });

const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable;
