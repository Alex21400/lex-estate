import asyncHandler from 'express-async-handler';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate user jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register user
export const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Username, email and password are required.");
    }

    if(password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters long");
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(400);
        throw new Error("Email alread in use. Try another one.");
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login user
export const signin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error('Please enter email and password.');
    }

    // Check if user email exists in database
    const user = await User.findOne({ email });

    if(!user) {
        res.status(400);
        throw new Error('Email not found.');
    }

    // Check if password is okay
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    const token = generateToken(user._id);

    if(isPasswordCorrect) {
        res.cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 86400),
            sameSite: 'none',
            secure: true
        })
    }

    if(user && isPasswordCorrect) {
        res.status(200).json({
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});