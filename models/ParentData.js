import { Schema, model } from 'mongoose';

const parentDataSchema = new Schema({
    child: [{
        type: Schema.Types.ObjectId,
        ref: 'Child',
        index: true
    }]
}, { timestamps: true });

export const ParentData = model('ParentData', parentDataSchema); 