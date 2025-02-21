import FriendRequest from '../../models/FriendRequest.js'; // Adjust the path as necessary
import User from '../../models/User.js'; // Adjust the path as necessary

const friendRequestResolvers = {
    Query: {
        getPendingRequests: async (_, __, { user }) => {
            return await FriendRequest.find({ receiver: user._id, status: 'pending' })
                .populate('sender', 'username profile');
        },
        getFriendsList: async (_, __, { user }) => {
            const userData = await User.findById(user._id).populate('friends', 'username email profile');
            return userData.friends;
        },
    },
    Mutation: {
        followUser: async (_, { userId }, { user }) => {
            if (userId === user._id) {
                throw new Error('Cannot follow yourself');
            }

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }

            await User.findByIdAndUpdate(userId, { $addToSet: { followers: user._id } });
            await User.findByIdAndUpdate(user._id, { $addToSet: { following: userId } });

            return 'Successfully followed user';
        },
        unfollowUser: async (_, { userId }, { user }) => {
            if (userId === user._id) {
                throw new Error('Cannot unfollow yourself');
            }

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }

            await User.findByIdAndUpdate(userId, { $pull: { followers: user._id } });
            await User.findByIdAndUpdate(user._id, { $pull: { following: userId } });

            return 'Successfully unfollowed user';
        },
        sendFriendRequest: async (_, { userId }, { user }) => {
            if (userId === user._id) {
                throw new Error('Cannot send friend request to yourself');
            }

            const existingRequest = await FriendRequest.findOne({
                sender: user._id,
                receiver: userId,
                status: 'pending'
            });
            if (existingRequest) {
                throw new Error('Friend request already sent');
            }

            await FriendRequest.create({
                sender: user._id,
                receiver: userId,
                status: 'pending'
            });

            return 'Friend request sent successfully';
        },
        acceptFriendRequest: async (_, { requestId }, { user }) => {
            const request = await FriendRequest.findById(requestId);
            if (!request) {
                throw new Error('Friend request not found');
            }
            if (request.receiver.toString() !== user._id.toString()) {
                throw new Error('Not authorized to accept this request');
            }

            await FriendRequest.findByIdAndUpdate(requestId, { status: 'accepted' });
            await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: user._id } });
            await User.findByIdAndUpdate(user._id, { $addToSet: { friends: request.sender } });

            return 'Friend request accepted';
        },
        rejectFriendRequest: async (_, { requestId }, { user }) => {
            const request = await FriendRequest.findById(requestId);
            if (!request) {
                throw new Error('Friend request not found');
            }
            if (request.receiver.toString() !== user._id.toString()) {
                throw new Error('Not authorized to reject this request');
            }

            await FriendRequest.findByIdAndUpdate(requestId, { status: 'rejected' });
            return 'Friend request rejected';
        },
        cancelFriendRequest: async (_, { userId }, { user }) => {
            const request = await FriendRequest.findOne({
                sender: user._id,
                receiver: userId,
                status: 'pending'
            });
            if (!request) {
                throw new Error('Friend request not found');
            }

            await FriendRequest.findByIdAndDelete(request._id);
            return 'Friend request canceled';
        },
        removeFriend: async (_, { friendId }, { user }) => {
            await User.findByIdAndUpdate(user._id, { $pull: { friends: friendId } });
            await User.findByIdAndUpdate(friendId, { $pull: { friends: user._id } });

            return 'Friend removed successfully';
        },
    },
};

export default friendRequestResolvers; 