import express from 'express';
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createListing);
router.get('/:id', protect, getListing);
router.delete('/:id',protect, deleteListing);
router.patch('/:id', protect, updateListing);

export default router;