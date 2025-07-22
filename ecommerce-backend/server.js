const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const promBundle = require("express-prom-bundle");
const promMiddleware = require('express-red-middleware');

require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  customLabels: {project_name: 'ecommerce', project_type: 'ecommerce'},
 });



// express server
const app = express();

let corsOptions = {
  origin : "*",
  credentials: true 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(metricsMiddleware)
app.use(promMiddleware.promMiddleware({collectDefaultMetrics: false}));

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


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get("/",(req,res) => res.json({
  "GET /": "All Routes", 
  "GET /hello": "{hello:world}", 
  "GET /metrics": "Metrics data",
  "POST /bye": "POST Request: + post data"
 }));

// Start server
app.listen(PORT, IP, () => console.log(`Server running on ${IP}:${PORT}`));
