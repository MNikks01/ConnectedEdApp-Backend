import Feedback from '../models/Feedback.js';

export {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback
};

async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await Feedback.find()
            .populate('owner', 'name')
            .populate('school', 'name')
            .populate('child', 'name');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
    }
}

async function getFeedbackById(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id)
            .populate('owner', 'name')
            .populate('school', 'name')
            .populate('child', 'name');

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error: error.message });
    }
}

async function createFeedback(req, res) {
    try {
        const newFeedback = new Feedback({
            ...req.body,
            owner: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(400).json({ message: 'Error creating feedback', error: error.message });
    }
}

async function updateFeedback(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Check if user is the owner
        if (feedback.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this feedback' });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(400).json({ message: 'Error updating feedback', error: error.message });
    }
}

async function deleteFeedback(req, res) {
    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Check if user is the owner
        if (feedback.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this feedback' });
        }

        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error: error.message });
    }
} 