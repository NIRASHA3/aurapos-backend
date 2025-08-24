const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
dbConnect();

const app = express();

app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(express.json());

// Import route handlers
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/userRoute");
const billsRoute = require('./routes/billsRoute');
const categoriesRoute = require('./routes/categoriesRoute');

// Mount routes
app.use("/api/items", itemsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bills", billsRoute);
app.use("/api/categories", categoriesRoute);

// Root route
app.get("/", (req, res) => res.send("Hello World! from home api"));

// Export the app instead of calling app.listen()
module.exports = app;
