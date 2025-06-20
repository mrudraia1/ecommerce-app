const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const client = require('prom-client');
const register = new client.Registry();

require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const http_request_counter = new client.Counter({
  name: 'myapp_http_request_count',
  help: 'Count of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
  registers: [register]
});

register.registerMetric(http_request_counter);

// express server
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

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType); //client.register.contentType );
  res.end(await register.metrics());
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Start server
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
