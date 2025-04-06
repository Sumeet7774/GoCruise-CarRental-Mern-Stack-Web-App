import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Conected ${conn.connection.host}`);
  } catch (err) {
    console.error("error while connecting to database ", err.message);
    process.exit(1);
  }
};

export default connectDB;
