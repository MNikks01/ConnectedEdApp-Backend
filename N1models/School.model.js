// models/School.js
import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vision: { type: String },
    mission: { type: String },
    contactDetails: { type: String },
    address: { type: String },
    infrastructure: { type: String },
    facilities: [{ type: String }],
    achievements: [{ type: String }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Index for name (to efficiently find schools by name)
schoolSchema.index({ name: 1 });

// Index for teachers to quickly find schools based on teacher
schoolSchema.index({ teachers: 1 });


const School = mongoose.model('School', schoolSchema);
export default School;
