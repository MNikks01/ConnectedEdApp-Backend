import express from 'express';
import {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    addAdmin,
    removeAdmin,
    joinGroup,
    leaveGroup
} from '../controllers/group.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getAllGroups)
    .post(auth, createGroup);

router
    .route('/:id')
    .get(getGroupById)
    .put(auth, updateGroup)
    .delete(auth, deleteGroup);

// Member management routes
router
    .route('/:id/members')
    .post(auth, addMember)
    .delete(auth, removeMember);

// Admin management routes
router
    .route('/:id/admins')
    .post(auth, addAdmin)
    .delete(auth, removeAdmin);

// Group joining/leaving
router.post('/:id/join', auth, joinGroup);
router.post('/:id/leave', auth, leaveGroup);

export default router; 