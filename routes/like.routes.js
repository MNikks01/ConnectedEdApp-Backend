import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
    likePost,
    unlikePost,
    getLikes
} from '../controllers/like.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Like a post
router.post('/post/:postId', likePost);

// Unlike a post
router.delete('/post/:postId', unlikePost);

// Get likes for a post
router.get('/post/:postId', getLikes);

export default router; 