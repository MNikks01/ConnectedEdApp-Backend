// routes/teacherRoutes.js
import express from 'express';
import { getTeacherProfile, updateTeacherProfile } from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get a teacher's profile
router.get('/:teacherId', getTeacherProfile);

// Update a teacher's profile
router.put('/:teacherId', authMiddleware, updateTeacherProfile);

export default router;
