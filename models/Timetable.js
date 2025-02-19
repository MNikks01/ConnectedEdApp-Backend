const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    timetable: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    medClsSec: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true });

// Compound index for timetable queries
timetableSchema.index({ school: 1, medClsSec: 1 });

module.exports = mongoose.model('Timetable', timetableSchema); 