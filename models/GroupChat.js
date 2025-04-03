import { Schema, model } from 'mongoose';

const groupChatSchema = new Schema({
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'GroupMessage'
    }],
    background: String
}, { timestamps: true });

export const GroupChat = model('GroupChat', groupChatSchema); 