import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express(); 

app.use(express.json());

// routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const runServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}` );
        })
    } catch(error) {
        console.log(error);
    }
}

runServer();