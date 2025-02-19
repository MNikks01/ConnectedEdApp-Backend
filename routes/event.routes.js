import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllEvents)
    .post(auth, createEvent);

router
    .route('/:id')
    .get(getEventById)
    .put(auth, updateEvent)
    .delete(auth, deleteEvent);

export default router; 