import express from 'express';
import {
    getAllPolls,
    getPollById,
    createPoll,
    updatePoll,
    deletePoll,
    votePoll
} from '../controllers/poll.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllPolls)
    .post(auth, createPoll);

router
    .route('/:id')
    .get(getPollById)
    .put(auth, updatePoll)
    .delete(auth, deletePoll);

// Voting route
router.post('/:id/vote', auth, votePoll);

export default router; 