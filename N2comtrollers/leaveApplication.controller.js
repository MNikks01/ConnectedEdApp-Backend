// controllers/leaveApplicationController.js
import LeaveApplication from '../models/LeaveApplication.js';

// Submit Leave Application
export const submitLeaveApplication = async (req, res) => {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    try {
        const leaveApplication = new LeaveApplication({
            user: userId,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await leaveApplication.save();
        res.status(201).json({ message: 'Leave application submitted successfully', leaveApplication });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Leave Applications by User
export const getLeaveApplicationsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const leaveApplications = await LeaveApplication.find({ user: userId });
        if (!leaveApplications) {
            return res.status(404).json({ message: 'No leave applications found for this user' });
        }
        res.status(200).json(leaveApplications);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Leave Applications
export const getAllLeaveApplications = async (req, res) => {
    try {
        const leaveApplications = await LeaveApplication.find();
        res.status(200).json(leaveApplications);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
