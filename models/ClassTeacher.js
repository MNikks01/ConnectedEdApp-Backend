const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classTeacherSchema = new Schema({
    verifiedBySchool: {
        type: Boolean,
        default: false
    },
    medClsSec: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ClassTeacher', classTeacherSchema); 