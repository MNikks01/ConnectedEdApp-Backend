import express from 'express';
import {
    getAllSyllabuses,
    getSyllabusById,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus
} from '../controllers/syllabus.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllSyllabuses)
    .post(auth, createSyllabus);

router
    .route('/:id')
    .get(getSyllabusById)
    .put(auth, updateSyllabus)
    .delete(auth, deleteSyllabus);

export default router; 