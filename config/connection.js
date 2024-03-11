import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/inv-mockup");

if (process.env.MONGODB_URI)
  console.log("connected to remote database");
else
  console.log("connected to local database");

export default mongoose.connection;
