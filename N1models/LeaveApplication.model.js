// models/LeaveApplication.js
import mongoose from 'mongoose';

const leaveApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Parent or Teacher
    leaveType: { type: String, enum: ['Sick', 'Personal', 'Vacation'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    reason: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Principal or Teacher
}, { timestamps: true });

// Index for user to quickly get leave applications by the user
leaveApplicationSchema.index({ user: 1 });

// Index for status to filter leave applications by their status
leaveApplicationSchema.index({ status: 1 });

// Index for startDate to quickly filter leave applications based on the start date
leaveApplicationSchema.index({ startDate: 1 });

const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema);
export default LeaveApplication;
