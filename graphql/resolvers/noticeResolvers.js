import Notice from '../../models/Notice.js'; // Adjust the path as necessary

const noticeResolvers = {
    Query: {
        getAllNotices: async () => {
            return await Notice.find()
                .populate('owner', 'name')
                .sort({ createdAt: -1 });
        },
        getNoticeById: async (_, { id }) => {
            const notice = await Notice.findById(id).populate('owner', 'name');
            if (!notice) throw new Error('Notice not found');
            return notice;
        },
    },
    Mutation: {
        createNotice: async (_, { subject, description }, { user }) => {
            const newNotice = new Notice({
                subject,
                description,
                owner: user._id, // Assuming user ID is available from auth middleware
            });

            return await newNotice.save();
        },
        updateNotice: async (_, { id, subject, description }, { user }) => {
            const notice = await Notice.findById(id);
            if (!notice) throw new Error('Notice not found');

            // Check if user is the owner
            if (notice.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this notice');
            }

            const updatedNotice = await Notice.findByIdAndUpdate(
                id,
                { subject, description },
                { new: true, runValidators: true }
            );

            return updatedNotice;
        },
        deleteNotice: async (_, { id }, { user }) => {
            const notice = await Notice.findById(id);
            if (!notice) throw new Error('Notice not found');

            // Check if user is the owner
            if (notice.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this notice');
            }

            await Notice.findByIdAndDelete(id);
            return 'Notice deleted successfully';
        },
    },
};

export default noticeResolvers; 