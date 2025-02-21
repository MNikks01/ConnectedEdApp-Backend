import Notification from '../../models/Notification.js'; // Adjust the path as necessary

const notificationResolvers = {
    Query: {
        getAllNotifications: async (_, __, { user }) => {
            return await Notification.find({ user: user._id })
                .populate('user', 'name')
                .sort({ createdAt: -1 });
        },
        getNotificationById: async (_, { id }) => {
            const notification = await Notification.findById(id).populate('user', 'name');
            if (!notification) throw new Error('Notification not found');
            return notification;
        },
    },
    Mutation: {
        createNotification: async (_, { type, message, data }, { user }) => {
            const newNotification = new Notification({
                type,
                message,
                data,
                user: user._id, // Assuming user ID is available from auth middleware
            });

            return await newNotification.save();
        },
        updateNotification: async (_, { id, type, message, data }, { user }) => {
            const notification = await Notification.findById(id);
            if (!notification) throw new Error('Notification not found');

            // Check if user is the owner
            if (notification.user.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this notification');
            }

            const updatedNotification = await Notification.findByIdAndUpdate(
                id,
                { type, message, data },
                { new: true, runValidators: true }
            );

            return updatedNotification;
        },
        deleteNotification: async (_, { id }, { user }) => {
            const notification = await Notification.findById(id);
            if (!notification) throw new Error('Notification not found');

            // Check if user is the owner
            if (notification.user.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this notification');
            }

            await Notification.findByIdAndDelete(id);
            return 'Notification deleted successfully';
        },
    },
};

export default notificationResolvers; 