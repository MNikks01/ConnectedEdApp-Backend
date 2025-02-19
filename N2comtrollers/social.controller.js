import User from '../models/User.js';

export const followUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const user = await User.findById(req.user.id);
        const userToFollow = await User.findById(userIdToFollow);

        if (!userToFollow) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.following.includes(userIdToFollow)) {
            return res.status(400).json({ error: 'Already following this user' });
        }

        user.following.push(userIdToFollow);
        userToFollow.followers.push(req.user.id);

        await user.save();
        await userToFollow.save();

        res.status(200).json({ message: 'Followed user successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error following user', details: err.message });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const { userIdToRequest } = req.body;
        const userToRequest = await User.findById(userIdToRequest);

        if (!userToRequest) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (userToRequest.friendRequests.includes(req.user.id)) {
            return res.status(400).json({ error: 'Friend request already sent' });
        }

        userToRequest.friendRequests.push(req.user.id);
        await userToRequest.save();

        res.status(200).json({ message: 'Friend request sent' });
    } catch (err) {
        res.status(400).json({ error: 'Error sending friend request', details: err.message });
    }
};
