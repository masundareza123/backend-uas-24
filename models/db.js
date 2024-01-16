// models/db.js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://tgas_dev:dvB63LI3J!T@database2.pptik.id/tgas_dev');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;
