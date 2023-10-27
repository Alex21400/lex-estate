import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const runServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}` );
        })
    } catch(error) {
        console.log(error)
    }
}

runServer();