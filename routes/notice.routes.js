import express from 'express';
import {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
} from '../controllers/notice.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllNotices)
    .post(auth, createNotice);

router
    .route('/:id')
    .get(getNoticeById)
    .put(auth, updateNotice)
    .delete(auth, deleteNotice);

export default router; 