const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../../models/models/tourModel');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1); // Exit process with failure code
});

// Load environment variables
dotenv.config({ path: './config.env' });

const DB = 'mongodb+srv://kareem:12345AA!!@nature.btzb1w9.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=nature';

// Connect to MongoDB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Added to use the new connection engine
  useCreateIndex: true,
  useFindAndModify: false
})
    .then(() => console.log('DB connection successful!'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure code
    });

// Import the app after setting up environment and connection
const app = require('./app');


// READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Data import error:', err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Data deletion error:', err);
  }
  process.exit();
};

// Command-line interface for data import and deletion
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); // Exit process with failure code
  });
});
