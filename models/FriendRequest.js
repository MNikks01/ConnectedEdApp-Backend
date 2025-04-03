import { Schema, model } from 'mongoose';

const friendRequestSchema = new Schema({
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
    status: {
        type: String,
        enum: ['pending', 'acceepted', 'rejected', 'cancelled'],
        default: 'pending',
        index: true
    }
}, { timestamps: true });

// Compound indexes for efficient querying
friendRequestSchema.index({ sender: 1, reciever: 1 });
friendRequestSchema.index({ status: 1, sender: 1 });
friendRequestSchema.index({ status: 1, reciever: 1 });

export const FriendRequest = model('FriendRequest', friendRequestSchema); 