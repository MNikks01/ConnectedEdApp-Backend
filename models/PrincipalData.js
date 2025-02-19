const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('PrincipalData', principalDataSchema); 