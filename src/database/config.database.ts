import mongoose from 'mongoose';
import { config } from '../config';

export const dbConnection = async () => {
  try {
    await mongoose.connect(config.DATABASE);

    console.log('Database connection');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to database');
  }
};
