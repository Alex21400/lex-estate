import asyncHandler from 'express-async-handler';
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        let hashedPassword;

        if(req.body.password) {
            hashedPassword = bcrypt.hashSync(req.body.password, 10);
        }

        user.username = req.body.username || user.username;
        user.password = hashedPassword || user.password;
        user.photo = req.body.photo || user.photo;

        const updatedUser = await user.save();

        

        // const updatedUser = await User.findByIdAndUpdate(user._id, {
        //     $set: {
        //         username: req.body.username,
        //         password: bcrypt.hashSync(req.body.password, 10),
        //         photo: req.body.photo
        //     }
        // }, { new: true });

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            photo: updatedUser.photo
        });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        await User.findByIdAndDelete(user._id);

        res.clearCookie('access_token');

        res.status(200).json({ message: 'User deleted successfuly.'});
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});