// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Parent or Teacher
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher or Principal
    feedback: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
}, { timestamps: true });

// Index for from to find feedback by the user who gave it
feedbackSchema.index({ from: 1 });

// Index for to to find feedback for the user who received it
feedbackSchema.index({ to: 1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
