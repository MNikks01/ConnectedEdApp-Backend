import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
    sendMessage,
    getConversation,
    getAllConversations,
    deleteMessage,
    markAsRead
} from '../controllers/message.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Send a new message
router.post('/send', sendMessage);

// Get conversation with specific user
router.get('/conversation/:userId', getConversation);

// Get all conversations
router.get('/conversations', getAllConversations);

// Delete a message
router.delete('/:messageId', deleteMessage);

// Mark message as read
router.patch('/:messageId/read', markAsRead);

export default router; 