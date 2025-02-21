import User from '../../models/User.js';
import { createError } from '../../utils/error.js';
import bcrypt from 'bcryptjs';

const userResolvers = {
    Query: {
        getAllUsers: async () => {
            return await User.find().select('-password');
        },
        getUserById: async (_, { id }) => {
            const user = await User.findById(id).select('-password');
            if (!user) throw createError(404, 'User not found');
            return user;
        },
        getUserProfile: async (_, __, { user }) => {
            const foundUser = await User.findById(user.id).select('-password');
            if (!foundUser) throw createError(404, 'User not found');
            return foundUser;
        }
    },
    Mutation: {
        createUser: async (_, { email, password, role }) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ email, password: hashedPassword, role });
            return await newUser.save();
        },
        updateUser: async (_, { id, ...rest }) => {
            if (rest.password) {
                const salt = await bcrypt.genSalt(10);
                rest.password = await bcrypt.hash(rest.password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(id, { $set: rest }, { new: true }).select('-password');
            if (!updatedUser) throw createError(404, 'User not found');
            return updatedUser;
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findByIdAndDelete(id);
            if (!user) throw createError(404, 'User not found');
            return 'User deleted successfully';
        },
        changePassword: async (_, { currentPassword, newPassword }, { user }) => {
            const foundUser = await User.findById(user.id);
            const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
            if (!isMatch) throw createError(400, 'Current password is incorrect');
            const salt = await bcrypt.genSalt(10);
            foundUser.password = await bcrypt.hash(newPassword, salt);
            await foundUser.save();
            return 'Password updated successfully';
        }
    }
};

export default userResolvers; 