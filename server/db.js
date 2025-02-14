const mongoose = require('mongoose');
const uri = 'mongodb+srv://sumo:test123@digits.ndytq.mongodb.net/digits?retryWrites=true&w=majority&appName=digits'
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;