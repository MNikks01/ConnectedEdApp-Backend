import { Schema, model } from 'mongoose';

const noticeSchema = new Schema({
    subject: {
        type: String,
        required: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    vieweBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Compound index for notice queries
noticeSchema.index({ owner: 1, createdAt: -1 });

export const Notice = model('Notice', noticeSchema); 