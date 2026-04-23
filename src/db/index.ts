import mongoose from 'mongoose';

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL!);

   console.log("connected to DB")
  } catch (error) {
    console.log("failed to connect mongoose")
    
    process.exit(1); // stop app if DB fails
  }
}

export default connectDB;