const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://apoorva:apoorva@SalesSimplify.jk9h7dy.mongodb.net/';

async function main() {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected!");
    } catch (error) {
        console.error('Error:', error);
    }
}

main().catch(console.error);
