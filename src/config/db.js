import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ DB Connection Failed', error);
    process.exit(1);
  }
};