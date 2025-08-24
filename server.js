const express = require("express");//main web server library
const cors = require("cors");//allows cross-origin requests (frontend-backend communication)
const dbConnect = require("./dbConnect");//handles connection to MongoDB
const dotenv = require("dotenv");

require("dotenv").config();

// connect to MongoDB
dbConnect();

const app = express(); //Create an Express application instance
//allows requests from different origins
app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(express.json()); //automatically parses JSON request bodies

// Import route handlers for different API endpoints
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/userRoute");
const billsRoute = require('./routes/billsRoute');
const categoriesRoute = require('./routes/categoriesRoute');

// Mount the route handlers to specific URL paths
app.use("/api/items/", itemsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bills/", billsRoute);
app.use('/api/categories', categoriesRoute);
const path = require('path')

if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req,res)=>{
         res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    }) 
}
//use environment variable PORT if available, otherwise default to 5000
const port = process.env.PORT || 5000;

// Define a simple root route for testing
app.get("/", (req, res) => res.send("Hello World! from home api"));
// Start the server and listen on the specified port
app.listen(port, () => console.log(`Node JS Server Running at port ${port}`));
