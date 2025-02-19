import express from 'express';
import {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
} from '../controllers/notification.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(auth, getAllNotifications)
    .post(auth, createNotification);

router
    .route('/:id')
    .get(auth, getNotificationById)
    .put(auth, updateNotification)
    .delete(auth, deleteNotification);

export default router; 