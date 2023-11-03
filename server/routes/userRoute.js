import express from 'express';
import { deleteUser, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.patch('/update', protect, updateUser);
router.delete('/delete', protect, deleteUser);

export default router
