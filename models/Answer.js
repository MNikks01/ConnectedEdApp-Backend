const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    answers: [String]
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema); 