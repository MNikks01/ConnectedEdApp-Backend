import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
    createComment,
    getComments,
    updateComment,
    deleteComment
} from '../controllers/comment.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create a comment on a post
router.post('/post/:postId', createComment);

// Get comments for a post
router.get('/post/:postId', getComments);

// Update a comment
router.put('/:commentId', updateComment);

// Delete a comment
router.delete('/:commentId', deleteComment);

export default router; 