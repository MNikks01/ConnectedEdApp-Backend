const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('PollOption', pollOptionSchema); 