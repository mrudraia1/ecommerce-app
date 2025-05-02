const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

let corsOptions = {
  origin : "*",
  credentials: true 
}

app.use(cors(corsOptions));
app.use(express.json());

const IP = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 5000;

const DB = process.env.MONGODB_DB;
const USER = process.env.MONGODB_USER;
const PW = process.env.MONGODB_PASSWORD;
const HOST = process.env.MONGODB_HOST;
const DB_PORT = process.env.MONGODB_PORT;
const MONGO_URL = `mongodb://${USER}:${PW}@${HOST}:${DB_PORT}/${DB}?authSource=admin`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// MongoDB connection
mongoose.connect(MONGO_URL, clientOptions)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

// Start server
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
