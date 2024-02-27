import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/step-by-step", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

module.exports = mongoose.connection;
