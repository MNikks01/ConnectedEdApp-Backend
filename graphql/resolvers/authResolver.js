// graphql/resolvers/authResolver.js
import bcrypt from 'bcryptjs';
import { generateToken } from '../../config/jwt.js';
import User from '../../models/User.js';

const authResolver = {
    Query: {
        login: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = generateToken(user.id);
            return {
                userId: user.id,
                token,
                tokenExpiration: 30, // 30 days
            };
        },
    },

    Mutation: {
        register: async (_, { input }) => {
            const { email, password, name } = input;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword, name });
            await newUser.save();
            return newUser;
        },
    },
};

export default authResolver;
