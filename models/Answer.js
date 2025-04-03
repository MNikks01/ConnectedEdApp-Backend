import { Schema, model } from 'mongoose';

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    answers: [String]
}, { timestamps: true });

export const Answer = model('Answer', answerSchema); 