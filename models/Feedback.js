import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    onwerRole: {
        type: String,
        enum: ['student', 'parent', 'teacher'],
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['complaint', 'suggestion'],
        required: true,
        index: true
    },
    description: String,
    child: {
        type: Schema.Types.ObjectId,
        ref: 'Child'
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'sent', 'pending'],
        default: 'pending',
        index: true
    }
}, { timestamps: true });

// Compound indexes for feedback queries
feedbackSchema.index({ school: 1, type: 1 });
feedbackSchema.index({ owner: 1, status: 1 });

export const Feedback = model('Feedback', feedbackSchema); 