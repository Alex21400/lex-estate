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

// Get single listing
export const getListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate('userId', 'email');

    if(!listing) {
        res.status(404);
        throw new Error('Listing not found.');
    }

    res.status(200).json(listing);
});

// Delete listing
export const deleteListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        res.status(404);
        throw new Error('Listing not found.');
    }

    // if(req.user._id !== listing.userId) {
    //     res.status(401);
    //     throw new Error('You can delete only your own listings.');
    // }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Listing deleted.' });
});

// Update listing
export const updateListing = asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        res.status(404);
        throw new Error('Listing not found.');
    }

    if(req.user.id !== listing.userId.toString()) {
        res.status(401);
        throw new Error('You can update only your own listings.');
    }

    const { title, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls } = req.body

    const updatedListing= await Listing.findByIdAndUpdate(
        { _id: req.params.id },
        {
            title,
            description,
            address,
            regularPrice,
            discountPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls 
        }, {
                new: true
        });

        res.status(200).json(updatedListing);
});