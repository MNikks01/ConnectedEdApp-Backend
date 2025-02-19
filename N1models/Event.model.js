// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    eventDate: { type: Date, required: true },
    crowdAllowed: { type: String, enum: ['Public', 'Private'], required: true },
    chiefGuest: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', designation: { type: String } }
    ],
    location: { type: String },
    type: { type: String, enum: ['Academic', 'Sports', 'Cultural', 'Social', 'Other'], required: true },
    mode: { type: String, enum: ['Online', 'Offline'], required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
}, { timestamps: true });

// Index for eventDate to find upcoming events quickly
eventSchema.index({ eventDate: 1 });

// Index for school to quickly find events by school
eventSchema.index({ school: 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;
