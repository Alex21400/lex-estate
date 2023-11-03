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
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            photo: newUser.photo,
            createdAt: newUser.createdAt,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Login user
export const signin = asyncHandler(async (req, res) => {
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
        });
    }

    if(user && isPasswordCorrect) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

// Login with google provider
export const googleSignIn = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if(user) {
        const token = generateToken(user._id);

        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({
            username: user.username,
            email: user.email
        });
    } else {
        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        
        const name = req.body.name.concat(Math.random().toString(36).slice(-3));

        const newUser = await User.create({
            username: name,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo
        });

        const token = generateToken(newUser._id);
        res.cookie('access_token', token, { httpOnly: true });

        if(newUser) {
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                photo: newUser.photo,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data.');
        }
    }
});

// logout user
export const signoutUser = asyncHandler(async (req, res) => {
    // make the cookie expire
    res.cookie('access_token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });

    return res.status(200).json({ message: 'Signout successful' });
});
