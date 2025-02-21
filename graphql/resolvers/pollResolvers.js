import Poll from '../../models/Poll.js'; // Adjust the path as necessary

const pollResolvers = {
    Query: {
        getAllPolls: async () => {
            return await Poll.find()
                .populate('createdBy', 'name')
                .sort({ createdAt: -1 });
        },
        getPollById: async (_, { id }) => {
            const poll = await Poll.findById(id).populate('createdBy', 'name');
            if (!poll) throw new Error('Poll not found');
            return poll;
        },
    },
    Mutation: {
        createPoll: async (_, { question, options, visibility, expires }, { user }) => {
            const newPoll = new Poll({
                question,
                options: options.map(option => ({ text: option, votes: 0 })), // Assuming options are strings
                createdBy: user._id,
                visibility,
                expires,
            });

            return await newPoll.save();
        },
        updatePoll: async (_, { id, question, options, visibility, expires }, { user }) => {
            const poll = await Poll.findById(id);
            if (!poll) throw new Error('Poll not found');

            // Check if user is the owner
            if (poll.createdBy.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this poll');
            }

            const updatedPoll = await Poll.findByIdAndUpdate(
                id,
                { question, options, visibility, expires },
                { new: true, runValidators: true }
            );

            return updatedPoll;
        },
        deletePoll: async (_, { id }, { user }) => {
            const poll = await Poll.findById(id);
            if (!poll) throw new Error('Poll not found');

            // Check if user is the owner
            if (poll.createdBy.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this poll');
            }

            await Poll.findByIdAndDelete(id);
            return 'Poll deleted successfully';
        },
        votePoll: async (_, { id, optionId }, { user }) => {
            const poll = await Poll.findById(id);
            if (!poll) throw new Error('Poll not found');

            // Check if the option ID is valid
            if (!poll.options.some(option => option._id.toString() === optionId)) {
                throw new Error('Invalid option ID');
            }

            // Check if the user has already voted
            if (poll.votes.includes(user._id)) {
                throw new Error('You have already voted on this poll');
            }

            // Add the vote
            poll.votes.push(user._id);
            poll.options.id(optionId).votes += 1; // Increment the vote count for the selected option
            await poll.save();

            return poll;
        },
    },
};

export default pollResolvers; 