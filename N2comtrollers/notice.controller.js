// controllers/noticeController.js
import Notice from '../models/Notice.js';

// Create Notice
export const createNotice = async (req, res) => {
    const { title, content, postedBy, targetAudience } = req.body;

    try {
        const notice = new Notice({
            title,
            content,
            postedBy,
            targetAudience
        });

        await notice.save();
        res.status(201).json({ message: 'Notice created successfully', notice });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Notices
export const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Notices by Target Audience
export const getNoticesByTargetAudience = async (req, res) => {
    const { targetAudience } = req.params;

    try {
        const notices = await Notice.find({ targetAudience: targetAudience });
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
