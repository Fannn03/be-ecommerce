import mongoose from "mongoose";
import 'dotenv/config'

export const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL as string);

    console.log("Connected to MongoDB");
    return connection;
  } catch (err) {
    throw err
  }
}