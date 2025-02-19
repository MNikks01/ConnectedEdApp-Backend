import Poll from '../models/Poll.js';

export {
    getAllPolls,
    getPollById,
    createPoll,
    updatePoll,
    deletePoll,
    votePoll
};

async function getAllPolls(req, res) {
    try {
        const polls = await Poll.find()
            .populate('owner', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching polls', error: error.message });
    }
}

async function getPollById(req, res) {
    try {
        const poll = await Poll.findById(req.params.id)
            .populate('owner', 'name');

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching poll', error: error.message });
    }
}

async function createPoll(req, res) {
    try {
        const newPoll = new Poll({
            ...req.body,
            owner: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedPoll = await newPoll.save();
        res.status(201).json(savedPoll);
    } catch (error) {
        res.status(400).json({ message: 'Error creating poll', error: error.message });
    }
}

async function updatePoll(req, res) {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        // Check if user is the owner
        if (poll.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this poll' });
        }

        const updatedPoll = await Poll.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedPoll);
    } catch (error) {
        res.status(400).json({ message: 'Error updating poll', error: error.message });
    }
}

async function deletePoll(req, res) {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        // Check if user is the owner
        if (poll.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this poll' });
        }

        await Poll.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting poll', error: error.message });
    }
}

async function votePoll(req, res) {
    try {
        const { optionId } = req.body; // Assuming the option ID is sent in the request body
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        // Check if the option ID is valid
        if (!poll.options.some(option => option._id.toString() === optionId)) {
            return res.status(400).json({ message: 'Invalid option ID' });
        }

        // Check if the user has already voted
        if (poll.voters.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already voted on this poll' });
        }

        // Add the vote
        poll.voters.push(req.user._id);
        poll.options.id(optionId).votes += 1; // Increment the vote count for the selected option
        await poll.save();

        res.status(200).json(poll);
    } catch (error) {
        res.status(400).json({ message: 'Error voting on poll', error: error.message });
    }
} 