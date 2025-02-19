// routes/leaveRoutes.js
import express from 'express';
import { applyLeave, getLeaveStatus } from '../controllers/leaveController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply leave for a student (for parents)
router.post('/student', authMiddleware, applyLeave);

// Apply leave for a teacher (for teachers)
router.post('/teacher', authMiddleware, applyLeave);

// Get the status of leave applications
router.get('/status', authMiddleware, getLeaveStatus);

export default router;
