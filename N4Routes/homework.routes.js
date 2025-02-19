// routes/homeworkRoutes.js
import express from 'express';
import { addHomework, getHomework, updateHomework } from '../controllers/homeworkController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a new homework task (only for teachers)
router.post('/', authMiddleware, roleMiddleware(['Teacher']), addHomework);

// Get all homework tasks for a specific class
router.get('/:classId', authMiddleware, getHomework);

// Update an existing homework task (only for teachers)
router.put('/:homeworkId', authMiddleware, roleMiddleware(['Teacher']), updateHomework);

export default router;
