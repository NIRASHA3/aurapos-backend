const mongoose = require("mongoose");

// Cached connection to prevent multiple connections in serverless functions
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return cached connection if available
  if (cached.conn) return cached.conn;

  // Create a new promise if it doesn't exist
  if (!cached.promise) {
    console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL);

    cached.promise = mongoose
      .connect(process.env.MONGO_URL)
      .then((m) => m)
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        throw err; // Rethrow to stop execution if connection fails
      });
  }

  // Await the connection promise and cache it
  cached.conn = await cached.promise;
  console.log("Mongo DB Connection Successful");
  return cached.conn;
}

module.exports = dbConnect;
