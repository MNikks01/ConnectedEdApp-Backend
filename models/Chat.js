import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, { timestamps: true });

export const Chat = model('Chat', chatSchema); 