// @ts-check
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoUrl: string = process.env.MONGO_TEST_URL || "";

export async function connectDBForTesting() {
  try {
    await mongoose.connect(mongoUrl, { autoCreate: true });
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}