import LeaveApplication from '../../models/LeaveApplication.js'; // Adjust the path as necessary

const leaveApplicationResolvers = {
    Query: {
        getAllLeaveApplications: async () => {
            return await LeaveApplication.find()
                .populate('school', 'name')
                .populate('owner', 'name')
                .populate('child', 'name');
        },
        getLeaveApplicationById: async (_, { id }) => {
            const leaveApplication = await LeaveApplication.findById(id)
                .populate('school', 'name')
                .populate('owner', 'name')
                .populate('child', 'name');

            if (!leaveApplication) throw new Error('Leave application not found');
            return leaveApplication;
        },
        getSchoolLeaveApplications: async (_, { schoolId }) => {
            return await LeaveApplication.find({ school: schoolId })
                .populate('owner', 'name')
                .populate('child', 'name')
                .sort({ createdAt: -1 });
        },
        getUserLeaveApplications: async (_, { userId }) => {
            return await LeaveApplication.find({ owner: userId })
                .populate('school', 'name')
                .populate('child', 'name')
                .sort({ createdAt: -1 });
        },
    },
    Mutation: {
        createLeaveApplication: async (_, { school, userRole, child, text, subject, oneDay, startDate, endDate }, { user }) => {
            const newLeaveApplication = new LeaveApplication({
                school,
                owner: user._id,
                userRole,
                child,
                text,
                subject,
                oneDay,
                startDate,
                endDate,
                status: 'sent',
            });

            return await newLeaveApplication.save();
        },
        updateLeaveApplication: async (_, { id, text, subject, oneDay, startDate, endDate }, { user }) => {
            const leaveApplication = await LeaveApplication.findById(id);
            if (!leaveApplication) throw new Error('Leave application not found');

            // Only owner can update their application
            if (leaveApplication.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this leave application');
            }

            // Can't update if already accepted/rejected
            if (leaveApplication.status !== 'sent') {
                throw new Error('Cannot update processed leave application');
            }

            const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
                id,
                { text, subject, oneDay, startDate, endDate },
                { new: true, runValidators: true }
            );

            return updatedLeaveApplication;
        },
        deleteLeaveApplication: async (_, { id }, { user }) => {
            const leaveApplication = await LeaveApplication.findById(id);
            if (!leaveApplication) throw new Error('Leave application not found');

            // Only owner can delete their application
            if (leaveApplication.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this leave application');
            }

            // Can't delete if already accepted/rejected
            if (leaveApplication.status !== 'sent') {
                throw new Error('Cannot delete processed leave application');
            }

            await LeaveApplication.findByIdAndDelete(id);
            return 'Leave application deleted successfully';
        },
        updateLeaveStatus: async (_, { id, status }, { user }) => {
            const leaveApplication = await LeaveApplication.findById(id);
            if (!leaveApplication) throw new Error('Leave application not found');

            // Only school admin can update status
            if (leaveApplication.school.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update leave status');
            }

            if (!['accepted', 'rejected'].includes(status)) {
                throw new Error('Invalid status');
            }

            leaveApplication.status = status;
            await leaveApplication.save();

            return leaveApplication;
        },
    },
};

export default leaveApplicationResolvers; 