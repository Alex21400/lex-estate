import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listingRouter from './routes/listingRoute.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express(); 

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listings', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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