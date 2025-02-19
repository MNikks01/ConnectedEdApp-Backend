import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getFeed,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getPendingRequests,
    getFriendsList,
    removeFriend
} from '../controllers/social.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Follow/Unfollow routes
router.post('/follow/:userId', followUser);
router.post('/unfollow/:userId', unfollowUser);
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);
router.get('/feed', getFeed);

// Friend request routes
router.post('/friend-request/:userId', sendFriendRequest);
router.post('/friend-request/:requestId/accept', acceptFriendRequest);
router.post('/friend-request/:requestId/reject', rejectFriendRequest);
router.get('/friend-requests/pending', getPendingRequests);

// Friends management routes
router.get('/friends', getFriendsList);
router.delete('/friends/:friendId', removeFriend);

export default router; 