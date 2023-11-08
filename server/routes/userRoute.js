import express from 'express';
import { deleteUser, getUserListings, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.patch('/update', protect, updateUser);
router.delete('/delete', protect, deleteUser);
router.get('/userListings', protect, getUserListings);

export default router
