import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    changePassword
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateUser } from '../middleware/validation.middleware.js';
import { checkRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Public profile routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, validateUser, updateUserProfile);
router.put('/change-password', authMiddleware, changePassword);

// Admin only routes
router.get('/', authMiddleware, checkRole(['admin']), getAllUsers);
router.get('/:id', authMiddleware, checkRole(['admin']), getUserById);
router.post('/', authMiddleware, checkRole(['admin']), validateUser, createUser);
router.put('/:id', authMiddleware, checkRole(['admin']), validateUser, updateUser);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteUser);

export default router; 