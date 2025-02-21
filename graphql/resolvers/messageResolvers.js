import Message from '../../models/Message.js'; // Adjust the path as necessary

const messageResolvers = {
    Query: {
        getConversation: async (_, { userId }, { user }) => {
            const currentUserId = user._id;

            const messages = await Message.find({
                $or: [
                    { sender: currentUserId, receiver: userId },
                    { sender: userId, receiver: currentUserId }
                ]
            })
                .sort({ createdAt: 1 })
                .populate('sender', 'username profile')
                .populate('receiver', 'username profile');

            return messages;
        },
        getAllConversations: async (_, __, { user }) => {
            const userId = user._id;

            const conversations = await Message.aggregate([
                {
                    $match: {
                        $or: [{ sender: userId }, { receiver: userId }]
                    }
                },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ['$sender', userId] },
                                '$receiver',
                                '$sender'
                            ]
                        },
                        lastMessage: { $last: '$text' },
                        timestamp: { $last: '$createdAt' }
                    }
                },
                { $sort: { timestamp: -1 } }
            ]);

            return conversations;
        },
    },
    Mutation: {
        sendMessage: async (_, { recipientId, content }, { user }) => {
            const senderId = user._id;

            // Prevent sending message to self
            if (senderId === recipientId) {
                throw new Error('Cannot send message to yourself');
            }

            const message = await Message.create({
                sender: senderId,
                receiver: recipientId,
                text: content,
            });

            return message;
        },
        deleteMessage: async (_, { messageId }, { user }) => {
            const message = await Message.findById(messageId);
            if (!message) throw new Error('Message not found');

            // Only the sender can delete their message
            if (message.sender.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this message');
            }

            await Message.findByIdAndDelete(messageId);
            return 'Message deleted successfully';
        },
        markAsRead: async (_, { messageId }, { user }) => {
            const message = await Message.findOneAndUpdate(
                {
                    _id: messageId,
                    receiver: user._id,
                },
                { read: true },
                { new: true }
            );

            if (!message) throw new Error('Message not found or already read');

            return 'Message marked as read';
        },
    },
};

export default messageResolvers; 