// routes/profileRoutes.js
import express from 'express';
import { updateProfilePicture, updateProfileInfo } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Update profile picture (single image upload)
router.put('/profile-picture', authMiddleware, upload, updateProfilePicture);

// Update other profile information (name, bio, etc.)
router.put('/info', authMiddleware, updateProfileInfo);

export default router;
