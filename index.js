//.env file configurations
require('dotenv/config');

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


// Load environment variables from .env file
dotenv.config();


// Import routes from .routes
const{
    UserRoutes,
    ProjectRoutes,
    TaskRoutes,
    TeamRoutes,
    ClientRoutes,
    } = require('./routes')


// Initialize Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(bodyParser.json());


// Define port for the server to listen on
const PORT = process.env.PORT || 5000;

// Define MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully."); // Log successful database connection
    // Start server on specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`); // Log server running message
    });
  })
  .catch((error) => console.log(error)); // Log error if database connection fails


// routes
app.use('/api/v1/employees', UserRoutes);
app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/tasks', TaskRoutes);
app.use('/api/v1/teams', TeamRoutes);
app.use('/api/v1/clients', ClientRoutes);