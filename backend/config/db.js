import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("DB connection failed : ",err));
}