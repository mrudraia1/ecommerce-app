const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const amqp = require('amqplib');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;

const RABBITMQ_URL = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;


// Order Schema
const orderSchema = new mongoose.Schema({
  items: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

router.post('/', async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in the order.' });
  }

  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'orderQueue';

    await channel.assertQueue(queue, { durable: true });
    
    const orderData = {
      items,
      createdAt: new Date()
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(orderData)), {
      persistent: true
    });

    console.log('Order sent to RabbitMQ:', orderData);
    await channel.close();
    await connection.close();

    res.json({ message: 'Order queued successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to queue order.' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
