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

// Connect to MongoDB
mongoose.connect(MONGO_URL, clientOptions);

const orderSchema = new mongoose.Schema({
  items: Array,
  createdAt: Date
});

const Order = mongoose.model('Order', orderSchema);

async function startWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
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
    console.error(error);
  }
}

startWorker();
