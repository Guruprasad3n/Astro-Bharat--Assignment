import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database Connected");
  } catch (error) {
    console.log("Connection Error", error);
  }
};

export default connectDB;
