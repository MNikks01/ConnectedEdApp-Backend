const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    displayPicture: String,
    name: {
        type: String,
        required: true,
        index: true
    },
    bio: String,
    achievements: [String],
    education: Schema.Types.Mixed,
    DOB: String,
    gender: String,
    mobileNumber: Number
}, { timestamps: true });

// Compound index for name and mobileNumber
userDataSchema.index({ name: 1, mobileNumber: 1 });

module.exports = mongoose.model('UserData', userDataSchema); 