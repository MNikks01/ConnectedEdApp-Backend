// graphql/resolvers/userResolver.js
import User from '../../models/User.js';

const userResolver = {
    Query: {
        getUser: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },
        getAllUsers: async () => {
            return await User.find();
        },
    },

    Mutation: {
        updateUser: async (_, { id, input }) => {
            const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        },
        deleteUser: async (_, { id }) => {
            const result = await User.findByIdAndDelete(id);
            return result !== null;
        },
    },
};

export default userResolver;
