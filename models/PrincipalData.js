import { Schema, model } from 'mongoose';

const principalDataSchema = new Schema({
    school: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    verifiedBySchool: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const PrincipalData = model('PrincipalData', principalDataSchema); 