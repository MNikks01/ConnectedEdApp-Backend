import express from 'express';
import {
    getAllProjectsAndHomeworks,
    getProjectAndHomeworkById,
    createProjectAndHomework,
    updateProjectAndHomework,
    deleteProjectAndHomework
} from '../controllers/projectAndHomework.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllProjectsAndHomeworks)
    .post(auth, createProjectAndHomework);

router
    .route('/:id')
    .get(getProjectAndHomeworkById)
    .put(auth, updateProjectAndHomework)
    .delete(auth, deleteProjectAndHomework);

export default router; 