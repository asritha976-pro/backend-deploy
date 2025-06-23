const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ENDPOINT}/${process.env.DATABASE_NAME}`

const mongoConnection = async() => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Successfully connected to MongoDB Atlas");
    }catch(error){
        console.log('MonoDB Connection Error:',error.message);
        process.exit(1);
    }
}

module.exports = mongoConnection;