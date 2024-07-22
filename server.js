const mongoose = require('mongoose');

// Global error handling for uncaught exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1); // Exit process with failure code
});

// MongoDB connection string directly with a database name
const DB = 'mongodb+srv://kareem:12345AA!!@nature.btzb1w9.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=nature';

// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1); // Exit process with failure code
    });
});
