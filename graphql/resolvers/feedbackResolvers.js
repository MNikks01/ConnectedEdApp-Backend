import Feedback from '../../models/Feedback.js'; // Adjust the path as necessary

const feedbackResolvers = {
    Query: {
        getAllFeedbacks: async () => {
            return await Feedback.find()
                .populate('owner', 'name')
                .populate('school', 'name')
                .populate('child', 'name');
        },
        getFeedbackById: async (_, { id }) => {
            const feedback = await Feedback.findById(id)
                .populate('owner', 'name')
                .populate('school', 'name')
                .populate('child', 'name');

            if (!feedback) throw new Error('Feedback not found');
            return feedback;
        },
    },
    Mutation: {
        createFeedback: async (_, { ownerRole, school, type, description, child }, { user }) => {
            const newFeedback = new Feedback({
                owner: user._id,
                ownerRole,
                school,
                type,
                description,
                child,
            });

            return await newFeedback.save();
        },
        updateFeedback: async (_, { id, ownerRole, school, type, description, child }, { user }) => {
            const feedback = await Feedback.findById(id);
            if (!feedback) throw new Error('Feedback not found');

            // Check if user is the owner
            if (feedback.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this feedback');
            }

            const updatedFeedback = await Feedback.findByIdAndUpdate(
                id,
                { ownerRole, school, type, description, child },
                { new: true, runValidators: true }
            );

            return updatedFeedback;
        },
        deleteFeedback: async (_, { id }, { user }) => {
            const feedback = await Feedback.findById(id);
            if (!feedback) throw new Error('Feedback not found');

            // Check if user is the owner
            if (feedback.owner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this feedback');
            }

            await Feedback.findByIdAndDelete(id);
            return 'Feedback deleted successfully';
        },
    },
};

export default feedbackResolvers; 