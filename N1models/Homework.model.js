// models/Homework.js
import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher
    subject: { type: String, required: true },
    class: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Students assigned the homework
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

// Index for assignedBy to quickly find homework assigned by a specific teacher
homeworkSchema.index({ assignedBy: 1 });

// Index for students to quickly find homework assigned to specific students
homeworkSchema.index({ students: 1 });

const Homework = mongoose.model('Homework', homeworkSchema);
export default Homework;
