const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ljueduhub";

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
