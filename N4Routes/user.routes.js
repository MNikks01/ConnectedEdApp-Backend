// routes/userRoutes.js
import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get the authenticated user's profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user's profile
router.put('/profile', authMiddleware, updateUserProfile);

export default router;
