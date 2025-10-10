require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_ORDER_URI,
    rabbitMQURI: process.env.rabbitMQURI,
    rabbitMQQueue: process.env.rabbitMQQueue,
    port: 3002
};
