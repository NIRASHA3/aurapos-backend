const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URL;
    console.log("Connecting to MongoDB with URL:", URL); 

    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongo DB Connection Successful");

  } catch (error) {
    console.error("Mongo DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
