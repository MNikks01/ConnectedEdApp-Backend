import { Schema, model } from 'mongoose';

const schoolDataSchema = new Schema({
    affiliation: String,
    about: String,
    achievements: [String],
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    village: String,
    city: {
        type: String,
        index: true
    },
    district: {
        type: String,
        index: true
    },
    state: {
        type: String,
        index: true
    },
    pinCode: String,
    etsablishedIn: String,
    facilities: [String],
    vision: String,
    mission: String,
    classList: [String],
    teacherList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    timetables: [{
        type: Schema.Types.ObjectId,
        ref: 'Timetable'
    }]
}, { timestamps: true });

// Compound index for location-based queries
schoolDataSchema.index({ state: 1, district: 1, city: 1 });

export const SchoolData = model('SchoolData', schoolDataSchema); 