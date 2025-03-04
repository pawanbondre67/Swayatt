const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/' , (req , res ) => {
  res.send('Hello World');
}
);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders.js'));
app.use('/api/materials', require('./routes/materials'));
// app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/workstations', require('./routes/workstation')); // Add workstation routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));