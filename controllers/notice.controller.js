import Notice from '../models/Notice.js';

export {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
};

async function getAllNotices(req, res) {
    try {
        const notices = await Notice.find()
            .populate('owner', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notices', error: error.message });
    }
}

async function getNoticeById(req, res) {
    try {
        const notice = await Notice.findById(req.params.id)
            .populate('owner', 'name');

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notice', error: error.message });
    }
}

async function createNotice(req, res) {
    try {
        const newNotice = new Notice({
            ...req.body,
            owner: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedNotice = await newNotice.save();
        res.status(201).json(savedNotice);
    } catch (error) {
        res.status(400).json({ message: 'Error creating notice', error: error.message });
    }
}

async function updateNotice(req, res) {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Check if user is the owner
        if (notice.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this notice' });
        }

        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(400).json({ message: 'Error updating notice', error: error.message });
    }
}

async function deleteNotice(req, res) {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Check if user is the owner
        if (notice.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this notice' });
        }

        await Notice.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notice', error: error.message });
    }
} 