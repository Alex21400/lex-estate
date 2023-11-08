import asyncHandler from 'express-async-handler';
import Listing from '../models/Listing.js';

// Create listing
export const createListing = asyncHandler(async (req, res) => {
    const { title, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls } = req.body

    // Validation
    if(!title || !description || !address || !regularPrice || !bathrooms || !bedrooms || !type || !imageUrls) {
        res.status(400);
        throw new Error('Please fill in all the fields');
    }

    const newListing = await Listing.create(req.body);

    res.status(201).json(newListing);
});

//