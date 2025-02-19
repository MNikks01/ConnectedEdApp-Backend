import LeaveApplication from '../models/LeaveApplication.js';

export {
    getAllLeaveApplications,
    getLeaveApplicationById,
    createLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
    updateLeaveStatus,
    getSchoolLeaveApplications,
    getUserLeaveApplications
};

async function getAllLeaveApplications(req, res) {
    try {
        const leaveApplications = await LeaveApplication.find()
            .populate('school', 'name')
            .populate('owner', 'name')
            .populate('child', 'name');
        res.status(200).json(leaveApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave applications', error: error.message });
    }
}

async function getLeaveApplicationById(req, res) {
    try {
        const leaveApplication = await LeaveApplication.findById(req.params.id)
            .populate('school', 'name')
            .populate('owner', 'name')
            .populate('child', 'name');

        if (!leaveApplication) {
            return res.status(404).json({ message: 'Leave application not found' });
        }

        res.status(200).json(leaveApplication);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave application', error: error.message });
    }
}

async function createLeaveApplication(req, res) {
    try {
        const newLeaveApplication = new LeaveApplication({
            ...req.body,
            owner: req.user._id,
            status: 'sent'
        });

        const savedLeaveApplication = await newLeaveApplication.save();
        res.status(201).json(savedLeaveApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error creating leave application', error: error.message });
    }
}

async function updateLeaveApplication(req, res) {
    try {
        const leaveApplication = await LeaveApplication.findById(req.params.id);

        if (!leaveApplication) {
            return res.status(404).json({ message: 'Leave application not found' });
        }

        // Only owner can update their application
        if (leaveApplication.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this leave application' });
        }

        // Can't update if already accepted/rejected
        if (leaveApplication.status !== 'sent') {
            return res.status(400).json({ message: 'Cannot update processed leave application' });
        }

        const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedLeaveApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error updating leave application', error: error.message });
    }
}

async function deleteLeaveApplication(req, res) {
    try {
        const leaveApplication = await LeaveApplication.findById(req.params.id);

        if (!leaveApplication) {
            return res.status(404).json({ message: 'Leave application not found' });
        }

        // Only owner can delete their application
        if (leaveApplication.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this leave application' });
        }

        // Can't delete if already accepted/rejected
        if (leaveApplication.status !== 'sent') {
            return res.status(400).json({ message: 'Cannot delete processed leave application' });
        }

        await LeaveApplication.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Leave application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting leave application', error: error.message });
    }
}

async function updateLeaveStatus(req, res) {
    try {
        const { status } = req.body;
        const leaveApplication = await LeaveApplication.findById(req.params.id);

        if (!leaveApplication) {
            return res.status(404).json({ message: 'Leave application not found' });
        }

        // Only school admin can update status
        if (leaveApplication.school.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update leave status' });
        }

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        leaveApplication.status = status;
        await leaveApplication.save();

        res.status(200).json(leaveApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error updating leave status', error: error.message });
    }
}

async function getSchoolLeaveApplications(req, res) {
    try {
        const { schoolId } = req.params;
        const leaveApplications = await LeaveApplication.find({ school: schoolId })
            .populate('owner', 'name')
            .populate('child', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(leaveApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching school leave applications', error: error.message });
    }
}

async function getUserLeaveApplications(req, res) {
    try {
        const { userId } = req.params;
        const leaveApplications = await LeaveApplication.find({ owner: userId })
            .populate('school', 'name')
            .populate('child', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(leaveApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user leave applications', error: error.message });
    }
} 