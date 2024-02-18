import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`📅 Database is connected.`);
    } catch (error) {
        console.log(`Error connecting to the database: ${error.message}`);
    }
}