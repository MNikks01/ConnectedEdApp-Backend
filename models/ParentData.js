const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentDataSchema = new Schema({
    child: [{
        type: Schema.Types.ObjectId,
        ref: 'Child',
        index: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('ParentData', parentDataSchema); 