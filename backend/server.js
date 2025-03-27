
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// dotenv.config();


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', require('./routes/authRoutes'));
// //app.use('/api/tasks', require('./routes/taskRoutes'));




// // Export the app object for testing
// if (require.main === module) {
//     connectDB();
//     // If the file is run directly, start the server
//     const PORT = process.env.PORT || 5002;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   }


// module.exports = app
// app.listen(5002, () => {
//   console.log('Server running on http://localhost:5002');
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
    res.send("Charity Donation API is running...");
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));        
app.use('/api/donors', require('./routes/donorRoutes'));      
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/donations', require('./routes/donationRoutes')); 

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



