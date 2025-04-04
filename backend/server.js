const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());


// app.use(cors());

app.use(cors({
  origin: 'http://54.206.62.117',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


//Routes 
app.use('/api/auth', require('./routes/authRoutes'));        
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/donations', require('./routes/donationRoutes')); 

// frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

//Start server
const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
