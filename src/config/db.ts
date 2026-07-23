import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI!


export async function connectDB() {

    if (!MONGO_URI) {
        console.log("MONGO_URI :", MONGO_URI)
        console.log("MONGO_URI is not exist")
        return
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        
        process.exit(1);
    }
}