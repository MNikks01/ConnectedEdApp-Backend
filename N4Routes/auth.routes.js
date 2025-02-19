// routes/authRoutes.js
import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/authController.js';
import { validateLogin, validateCreateUser } from '../middlewares/validateMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', validateCreateUser, registerUser);

// Login user
router.post('/login', validateLogin, loginUser);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

export default router;
