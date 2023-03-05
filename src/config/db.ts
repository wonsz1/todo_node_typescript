// @ts-check
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUrl: string = process.env.MONGO_URL || "";
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl);