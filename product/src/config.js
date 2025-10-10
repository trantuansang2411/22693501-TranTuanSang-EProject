require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_PRODUCT_URI,
  rabbitMQURI: process.env.RABBITMQ_URI,
  exchangeName: process.env.EXCHANGE_NAME,
  queueName: process.env.RABBITMQ_QUEUE,
};
