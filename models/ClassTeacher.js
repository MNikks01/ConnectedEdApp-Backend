import { Schema, model } from 'mongoose';

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

export const ClassTeacher = model('ClassTeacher', classTeacherSchema); 