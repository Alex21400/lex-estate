import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;