import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    date: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    type: {
        type: String,
        index: true
    },
    mode: String,
    onwer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        validate: {
            validator: async function (value) {
                const user = await model('User').findById(value);
                return user && user.role === 'SCHOOL';
            },
            message: 'Event owner must be a school'
        }
    },
    crowdAllowed: String,
    chiefGuest: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

// Compound indexes for event queries
eventSchema.index({ date: 1, onwer: 1 });
eventSchema.index({ type: 1, date: 1 });

export const Event = model('Event', eventSchema); 