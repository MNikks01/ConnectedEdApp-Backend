const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'GroupMessage'
    }],
    background: String
}, { timestamps: true });

module.exports = mongoose.model('GroupChat', groupChatSchema); 