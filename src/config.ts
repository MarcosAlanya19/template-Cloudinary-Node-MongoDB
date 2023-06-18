import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || '3000',
  DATABASE: process.env.MONGODB_CNN || '',
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
};
