// routes/notificationRoutes.js
import express from 'express';
import { getNotifications, sendNotification } from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all notifications for a user
router.get('/', authMiddleware, getNotifications);

// Send a new notification (for principals, admins, or teachers)
router.post('/', authMiddleware, roleMiddleware(['Principal', 'Teacher']), sendNotification);

export default router;
