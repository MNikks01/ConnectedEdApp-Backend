// models/Notice.js
import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    from: { type: String, required: true },
    viewedBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    description: { type: String, required: true },
    // targetAudience: { type: [String], enum: ['Students', 'Parents', 'Teachers', 'All'], required: true },
    datePosted: { type: Date, default: Date.now },
}, { timestamps: true });

// Index for targetAudience to filter notices based on the audience
noticeSchema.index({ targetAudience: 1 });

// Index for postedBy to find notices by the user (school/principal) who posted them
noticeSchema.index({ postedBy: 1 });

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
