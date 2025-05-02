const amqp = require('amqplib');
const express = require('express');
const router = express.Router();

// const RABBITMQ_URL = process.env.RABBITMQ_URL ;

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;

const RABBITMQ_URL = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;



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
