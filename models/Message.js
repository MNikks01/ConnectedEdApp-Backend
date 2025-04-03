import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    text: String,
    files: [String]
}, { timestamps: true });

// Compound indexes for chat queries
messageSchema.index({ sender: 1, reciever: 1 });
messageSchema.index({ createdAt: -1 });

export const Message = model('Message', messageSchema); 