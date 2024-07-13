import mongoose from 'mongoose';
import { config } from '../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoConnectionURL!);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
