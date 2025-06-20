import amqp from 'amqplib';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;

const RABBITMQ_URL = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

const DB = process.env.MONGODB_DB;
const USER = process.env.MONGODB_USER;
const PW = process.env.MONGODB_PASSWORD;
const HOST = process.env.MONGODB_HOST;
const DB_PORT = process.env.MONGODB_PORT;
const MONGO_URL = `mongodb://${USER}:${PW}@${HOST}:${DB_PORT}/${DB}?authSource=admin`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function connectRabbitMQ() {
  let connection;
  while (!connection) {
    try {
      connection = await amqp.connect(RABBITMQ_URL);
      console.log("Connected to RabbitMQ");
      return connection;
    } catch (err) {
      console.error("Failed to connect to RabbitMQ, retrying in 5s...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function startWorker() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL, clientOptions);
    console.log("Connected to MongoDB");

    const orderSchema = new mongoose.Schema({
      items: Array,
      createdAt: Date
    });
    const Order = mongoose.model('Order', orderSchema);

    // Connect to RabbitMQ
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue('orderQueue');
    console.log('Waiting for messages...');
    const queue = 'orderQueue';

    await channel.assertQueue(queue, { durable: true });
    console.log('Worker is waiting for messages in', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const orderData = JSON.parse(msg.content.toString());
        console.log('Processing order:', orderData);

        const order = new Order(orderData);
        await order.save();

        channel.ack(msg); // Confirm to RabbitMQ that the message is processed
        console.log('Order saved to MongoDB.');
      }
    }, { noAck: false });

  } catch (error) {
    console.error("Worker error:", error);
  }
}

startWorker();