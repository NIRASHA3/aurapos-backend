const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL);
    cached.promise = mongoose
      .connect(process.env.MONGO_URL)
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  console.log("Mongo DB Connection Successful");
  return cached.conn;
}

module.exports = dbConnect;
