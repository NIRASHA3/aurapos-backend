const express = require("express");
const router = express.Router(); // Create a new router instance for user routes

// Import controller functions
const {
  login,
  register
} = require("../controllers/userController");

// Define routes and map them to controller functions

// POST /api/users/login - Authenticate user
router.post("/login", login);

// POST /api/users/register - Create a new user
router.post("/register", register);

module.exports = router; // Export the router