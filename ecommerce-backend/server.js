const client = require('prom-client');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

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

// Create a Registry to register your metrics
const register = new client.Registry();

// Enable the collection of default Node.js metrics (CPU, memory, etc)
client.collectDefaultMetrics({ register });

// MongoDB connection
mongoose.connect(MONGO_URL, clientOptions)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Prometheus metrics
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", 'status_code'],
  registers: [register]
});

const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5], // Define your desired buckets
  registers: [register]
});

// Middleware to track request metrics (example for Express)
app.use((req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
});

//expose the metrics endpoint

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/products', productRoutes);


app.use('/orders', orderRoutes);

// Start server
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
