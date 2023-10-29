import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);

        console.log('Connected to MongoDB');
    } catch(error) {
        console.log(error.message);

        process.exit();
    }   
}