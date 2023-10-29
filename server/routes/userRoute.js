import express from 'express';
import { register } from '../controllers/userController.js';

const router = express.Router();

router.get('/', register);

export default router
