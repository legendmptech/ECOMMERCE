// db.js
import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default ConnectDB;
