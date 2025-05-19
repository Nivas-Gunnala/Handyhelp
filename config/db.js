const { MongoClient } = require('mongodb');

// Update connection string with authentication if needed
const uri = "mongodb://127.0.0.1:27017";  // Using IP address instead of localhost
const dbName = "handy_help";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectDB, client }; 