const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Connection Error", error);
  }
};
module.exports = connectDB;
