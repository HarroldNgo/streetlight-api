const mongoose = require('mongoose')
const dotenv = require("dotenv");

const connectDBs = () => {
    try {
        dotenv.config();
        mongoose.set('strictQuery', false);
        const streetlightDB = mongoose.createConnection(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        const heasDB = mongoose.createConnection(process.env.MONGO_URL2, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        return { streetlightDB, heasDB }
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDBs }