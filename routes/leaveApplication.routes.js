import express from 'express';
import {
    getAllLeaveApplications,
    getLeaveApplicationById,
    createLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
    updateLeaveStatus,
    getSchoolLeaveApplications,
    getUserLeaveApplications
} from '../controllers/leaveApplication.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(auth, getAllLeaveApplications)
    .post(auth, createLeaveApplication);

router
    .route('/:id')
    .get(auth, getLeaveApplicationById)
    .put(auth, updateLeaveApplication)
    .delete(auth, deleteLeaveApplication);

// Special routes
router.put('/:id/status', auth, updateLeaveStatus);
router.get('/school/:schoolId', auth, getSchoolLeaveApplications);
router.get('/user/:userId', auth, getUserLeaveApplications);

export default router; 