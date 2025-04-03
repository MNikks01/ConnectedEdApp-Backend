import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['friend_request', 'message', 'like', 'comment', 'mention', 'system'],
        required: true,
        index: true
    },
    message: String,
    data: String,
    isRead: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true });

// Compound indexes for notification queries
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, type: 1 });

export const Notification = model('Notification', notificationSchema); 