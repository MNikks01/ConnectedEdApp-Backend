import express from 'express';
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost
} from '../controllers/post.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllPosts)
    .post(auth, createPost);

router
    .route('/:id')
    .get(getPostById)
    .put(auth, updatePost)
    .delete(auth, deletePost);

// Like a post
router.post('/:id/like', auth, likePost);

export default router; 