import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
    joinChat,
    createChat,
    getChatHistory,
    leaveChat,
    getActiveChats
} from '../controllers/chat.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create a new chat room
router.post('/create', createChat);

// Join a chat room
router.post('/:chatId/join', joinChat);

// Leave a chat room
router.post('/:chatId/leave', leaveChat);

// Get chat history
router.get('/:chatId/history', getChatHistory);

// Get user's active chats
router.get('/active', getActiveChats);

export default router; 