const mongoose = require('mongoose');


const connectDB = async () => {

    
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/Assignment_tracker`,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)
};

module.exports = connectDB;