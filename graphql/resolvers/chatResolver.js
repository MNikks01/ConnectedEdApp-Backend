// graphql/resolvers/chatResolvers.js
import Chat from '../../models/Chat.js'; // Adjust the path as necessary

const chatResolvers = {
    Query: {
        getChatHistory: async (_, { chatId }, { user }) => {
            // Implement get chat history logic
            const chat = await Chat.findById(chatId).populate('messages');
            if (!chat) throw new Error('Chat not found');
            // Check if user is a participant (implement your logic)
            return chat.messages;
        },
        getActiveChats: async (_, __, { user }) => {
            // Implement get active chats logic
            const chats = await Chat.find({ participants: user.id }).populate('participants');
            return chats;
        }
    },
    Mutation: {
        joinChat: async (_, { chatId }, { user }) => {
            // Implement join chat logic
            const chat = await Chat.findById(chatId);
            if (!chat) throw new Error('Chat not found');
            // Add user to participants (implement your logic)
            return 'Successfully joined chat';
        },
        createChat: async (_, { name, participants }, { user }) => {
            // Implement create chat logic
            const newChat = await Chat.create({
                name,
                creator: user.id,
                participants: [...participants, user.id],
                createdAt: new Date()
            });
            return newChat;
        },
        leaveChat: async (_, { chatId }, { user }) => {
            // Implement leave chat logic
            const chat = await Chat.findById(chatId);
            if (!chat) throw new Error('Chat not found');
            // Remove user from participants (implement your logic)
            return 'Successfully left chat';
        }
    }
};

export default chatResolvers;