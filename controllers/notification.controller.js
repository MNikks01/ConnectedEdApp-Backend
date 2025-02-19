import Notification from '../models/Notification.js';

export {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
};

async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
}

async function getNotificationById(req, res) {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('user', 'name');

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notification', error: error.message });
    }
}

async function createNotification(req, res) {
    try {
        const newNotification = new Notification({
            ...req.body,
            user: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(400).json({ message: 'Error creating notification', error: error.message });
    }
}

async function updateNotification(req, res) {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Check if user is the owner
        if (notification.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this notification' });
        }

        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: 'Error updating notification', error: error.message });
    }
}

async function deleteNotification(req, res) {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Check if user is the owner
        if (notification.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this notification' });
        }

        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
} 