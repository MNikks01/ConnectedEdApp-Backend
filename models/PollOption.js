import { Schema, model } from 'mongoose';

const pollOptionSchema = new Schema({
    optionText: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0,
        index: true
    }
}, { timestamps: true });

export const PollOption = model('PollOption', pollOptionSchema); 