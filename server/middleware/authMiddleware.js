import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if(!token) {
            res.status(401);
            throw new Error('Not authenticated. Please log in.');
        }

        // verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from the token
        const user = await User.findById(verifiedToken.id).select('-password');

        if(!user) {
            res.status(401);
            throw new Error('User not found.');
        }

        req.user = user;
        next();
    } catch(error) {
        res.status(401);
        throw new Error('Not authenticated. Please log in.');
    }
})