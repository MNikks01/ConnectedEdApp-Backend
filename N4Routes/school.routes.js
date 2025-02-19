// routes/schoolRoutes.js
import express from 'express';
import { getSchoolProfile, addSchoolEvent } from '../controllers/schoolController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get a specific school profile
router.get('/:schoolId', getSchoolProfile);

// Add an event for the school (only for authorized users)
router.post('/event', authMiddleware, roleMiddleware(['Principal', 'Admin']), addSchoolEvent);

export default router;
