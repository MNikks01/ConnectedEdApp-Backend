import express from 'express';
import { getAllFeedbacks, getFeedbackById, createFeedback, updateFeedback, deleteFeedback } from '../controllers/feedback.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllFeedbacks)
    .post(auth, createFeedback);

router
    .route('/:id')
    .get(getFeedbackById)
    .put(auth, updateFeedback)
    .delete(auth, deleteFeedback);

export default router; 