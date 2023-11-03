import express from 'express';
import { googleSignIn, signin, signoutUser, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleSignIn);
router.get('/signout', signoutUser);

export default router