import mongoose from 'mongoose';

export const connectDB = async () => {
  console.log('DEBUG MONGO_URI:', process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
