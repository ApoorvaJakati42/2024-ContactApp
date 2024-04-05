const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://ghostuser:ghostuser@cluster0.91aoper.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log('Connected to MongoDB Atlas');

    // Example: Create a new database and collection
    const database = client.db('UserAuthenticationSystem');
    const collection = database.collection('Admins');

    // Example: Insert a document
    //await collection.insertOne({ name: 'John', age: 30 });

    // Example: Find documents
    //const documents = await collection.find({}).toArray();
    //console.log('Documents:', documents);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection when done
    await client.close();
  }
}

main().catch(console.error);
